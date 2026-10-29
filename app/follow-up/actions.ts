"use server"

import { headers } from "next/headers"
import { Resend } from "resend"
import { FollowUpEmail } from "@/emails/follow-up"
import { saveQuoteSubmission } from "@/lib/db"
import { prepareFollowUp, type FollowUpAck } from "@/lib/follow-up"
import { quoteNotificationEmail } from "@/lib/quote"
import { isRateLimited } from "@/lib/rate-limit"

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

export async function submitFollowUp(input: unknown): Promise<FollowUpAck> {
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

    const prepared = prepareFollowUp(input)

    if (prepared.status === "invalid") {
      console.warn(`[${requestId}] Validation failed`)
      return { error: "Please fill out all required fields correctly.", success: false }
    }

    if (prepared.status === "honeypot") {
      console.info(`[${requestId}] Honeypot triggered, silently ignoring`)
      return { success: true }
    }

    console.info(`[${requestId}] Processing follow-up from ${prepared.replyTo}`)

    const to = quoteNotificationEmail()
    const from = process.env.RESEND_FROM_EMAIL ?? "Pinkys Up <onboarding@resend.dev>"

    let resend: Resend | null = null
    let emailError: string | undefined
    try {
      resend = getResend()
    } catch (error) {
      console.error(`[${requestId}] Resend not configured:`, error)
      emailError = "Email service not configured"
    }

    if (resend && !emailError) {
      const notificationResult = await sendEmailWithRetry(resend, {
        from,
        to: [to],
        subject: prepared.subject,
        html: FollowUpEmail(prepared.letter),
        replyTo: prepared.replyTo,
      })

      if (!notificationResult.success) {
        console.error(`[${requestId}] Failed to send notification email:`, notificationResult.error)
        emailError = notificationResult.error
      } else {
        console.info(`[${requestId}] Notification email sent successfully`)
        emailSent = true
      }
    }

    try {
      const dbResult = await saveQuoteSubmission({
        ...prepared.archive,
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

    if (emailSent || dbSaved) {
      if (!emailSent) {
        console.warn(`[${requestId}] Note saved to database but email failed to send`)
      }
      if (!dbSaved) {
        console.warn(`[${requestId}] Email sent but database save failed`)
      }
      console.info(`[${requestId}] Follow-up processed successfully`)
      return { success: true }
    }

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
    console.error(`[${requestId}] Unexpected error processing follow-up:`, error)
    return {
      error: "An unexpected error occurred. Please try again or contact us directly.",
      success: false
    }
  }
}
