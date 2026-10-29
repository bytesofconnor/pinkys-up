"use server"

import { headers } from "next/headers"
import { Resend } from "resend"
import { QuoteRequestEmail } from "@/emails/quote-request"
import { QuoteConfirmationEmail } from "@/emails/quote-confirmation"
import { quoteNotificationEmail } from "@/lib/quote"
import { fieldsForInquiry, parseInquiry, type InquiryFormState, type InquiryInput } from "@/lib/inquiry"
import { isRateLimited } from "@/lib/rate-limit"
import { saveQuoteSubmission } from "@/lib/db"

function getClientKey(headerList: Headers) {
  const forwarded = headerList.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown"
  }

  return headerList.get("x-real-ip") ?? "unknown"
}

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("Email service is not configured")
  }

  return new Resend(apiKey)
}

async function sendEmailWithRetry(
  resend: Resend,
  emailData: Parameters<typeof resend.emails.send>[0],
  maxRetries = 2
): Promise<{ success: boolean; error?: string }> {
  let lastError: Error | null = null

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      await resend.emails.send(emailData)
      return { success: true }
    } catch (error) {
      lastError = error as Error
      
      const isRetryable = 
        lastError.message?.includes("timeout") ||
        lastError.message?.includes("network") ||
        lastError.message?.includes("ECONNRESET") ||
        lastError.message?.includes("503") ||
        lastError.message?.includes("429")

      if (attempt < maxRetries && isRetryable) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000)
        await new Promise(resolve => setTimeout(resolve, delay))
        continue
      }
      
      break
    }
  }

  const errorMessage = lastError?.message || "Unknown error"
  return { 
    success: false, 
    error: errorMessage 
  }
}

export async function submitQuoteForm(
  _prevState: InquiryFormState,
  input: InquiryInput,
): Promise<InquiryFormState> {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`
  let dbSaved = false
  let emailSent = false
  
  try {
    const headerList = await headers()
    const clientKey = getClientKey(headerList)
    
    if (isRateLimited(clientKey)) {
      console.warn(`[${requestId}] Rate limit exceeded for client: ${clientKey}`)
      return { error: "Too many requests. Please try again in an hour.", success: false }
    }

    const parsed = parseInquiry(input)

    if (!parsed.ok) {
      console.warn(`[${requestId}] Validation failed`)
      return { error: "Please fill out all required fields correctly.", success: false }
    }

    if (parsed.inquiry.website?.trim()) {
      console.info(`[${requestId}] Honeypot triggered, silently ignoring`)
      return { success: true }
    }

    const fields = fieldsForInquiry(parsed.inquiry)

    console.info(`[${requestId}] Processing ${parsed.inquiry.kind} request from ${parsed.inquiry.email}`)

    const to = quoteNotificationEmail()
    const from = process.env.RESEND_FROM_EMAIL ?? "Pinkys Up <onboarding@resend.dev>"
    const sendGuestConfirmation = process.env.SEND_GUEST_CONFIRMATION === "true"

    // Try to send notification email with retries
    let resend: Resend
    let emailError: string | undefined
    try {
      resend = getResend()
    } catch (error) {
      console.error(`[${requestId}] Resend not configured:`, error)
      emailError = "Email service not configured"
    }

    if (!emailError) {
      const notificationResult = await sendEmailWithRetry(resend!, {
        from,
        to: [to],
        subject: fields.notification.subject,
        html: QuoteRequestEmail({
          ...fields.notification.email,
          heading: fields.notification.heading,
          showReferral: fields.notification.showReferral,
        }),
        replyTo: parsed.inquiry.email,
      })

      if (!notificationResult.success) {
        console.error(`[${requestId}] Failed to send notification email:`, notificationResult.error)
        emailError = notificationResult.error
      } else {
        console.info(`[${requestId}] Notification email sent successfully`)
        emailSent = true

        // Send guest confirmation if enabled and notification succeeded
        if (sendGuestConfirmation) {
          const confirmationResult = await sendEmailWithRetry(resend!, {
            from,
            to: [parsed.inquiry.email],
            subject: fields.notification.confirmationSubject,
            html: QuoteConfirmationEmail(fields.notification.confirmation),
          })

          if (!confirmationResult.success) {
            console.warn(`[${requestId}] Failed to send confirmation email to guest:`, confirmationResult.error)
          } else {
            console.info(`[${requestId}] Confirmation email sent to guest`)
          }
        }
      }
    }

    // Try to save to database (even if email failed)
    try {
      const dbResult = await saveQuoteSubmission({
        ...fields.record,
        emailSent,
        emailError,
      })
      
      if (dbResult.success) {
        dbSaved = true
        console.log(`[${requestId}] Quote saved to database with ID: ${dbResult.id}`)
      } else {
        console.error(`[${requestId}] Failed to save quote to database:`, dbResult.error)
      }
    } catch (error) {
      console.error(`[${requestId}] Unexpected error saving to database:`, error)
    }

    // Return success if either email was sent OR database was saved
    // This ensures we don't lose the submission if one system fails
    if (emailSent || dbSaved) {
      if (!emailSent) {
        console.warn(`[${requestId}] Quote saved to database but email failed to send`)
      }
      if (!dbSaved) {
        console.warn(`[${requestId}] Email sent but database save failed`)
      }
      console.info(`[${requestId}] Quote request processed successfully`)
      return { success: true }
    }

    // Both failed - return appropriate error
    if (emailError) {
      const isConfigError = 
        emailError.includes("API key") ||
        emailError.includes("authentication") ||
        emailError.includes("unauthorized") ||
        emailError.includes("not configured")
      
      if (isConfigError) {
        return { 
          error: "Our booking system is temporarily unavailable. Please email us directly or try again later.", 
          success: false 
        }
      }
      
      const isRateLimit = emailError.includes("429") || emailError.includes("rate limit")
      if (isRateLimit) {
        return {
          error: "We're receiving high volume right now. Please try again in a few minutes or email us directly.",
          success: false
        }
      }
    }

    return { 
      error: "Unable to submit your request right now. Please try again in a few minutes or email us directly.", 
      success: false 
    }
  } catch (error) {
    console.error(`[${requestId}] Unexpected error processing quote form:`, error)
    return { 
      error: "An unexpected error occurred. Please try again or contact us directly.", 
      success: false 
    }
  }
}
