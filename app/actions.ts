"use server"

import { headers } from "next/headers"
import { z } from "zod"
import { Resend } from "resend"
import { QuoteRequestEmail } from "@/emails/quote-request"
import { QuoteConfirmationEmail } from "@/emails/quote-confirmation"
import { ALLOWED_SERVICES } from "@/lib/quote"
import { isRateLimited } from "@/lib/rate-limit"

const formSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  phone: z.string().trim().min(7, "Phone number is required").max(30),
  email: z.string().trim().email("Invalid email address").max(254),
  services: z.array(z.enum(ALLOWED_SERVICES)).min(1, "Please select at least one service").max(ALLOWED_SERVICES.length),
  eventType: z.string().trim().min(1, "Event type is required").max(120),
  eventDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid event date"),
  location: z.string().trim().min(1, "Location is required").max(200),
  guestCount: z.string().regex(/^[1-9]\d{0,4}$/, "Guest count must be between 1 and 99999"),
  referralSource: z.string().trim().max(200).optional().default(""),
  additionalDetails: z.string().trim().max(2000).optional(),
  website: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

type FormState = {
  error?: string | null
  success?: boolean
}

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
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(7)}`
  
  try {
    const headerList = await headers()
    const clientKey = getClientKey(headerList)
    
    if (isRateLimited(clientKey)) {
      console.warn(`[${requestId}] Rate limit exceeded for client: ${clientKey}`)
      return { error: "Too many requests. Please try again in an hour.", success: false }
    }

    const validatedFields = formSchema.safeParse(formData)

    if (!validatedFields.success) {
      console.warn(`[${requestId}] Validation failed:`, validatedFields.error.flatten())
      return { error: "Please fill out all required fields correctly.", success: false }
    }

    const { website, ...data } = validatedFields.data

    if (website?.trim()) {
      console.info(`[${requestId}] Honeypot triggered, silently ignoring`)
      return { success: true }
    }

    console.info(`[${requestId}] Processing quote request from ${data.email}`)

    const to = process.env.QUOTE_NOTIFICATION_EMAIL ?? "pereira.brenda61@gmail.com"
    const from = process.env.RESEND_FROM_EMAIL ?? "Pinkys Up <onboarding@resend.dev>"
    const sendGuestConfirmation = process.env.SEND_GUEST_CONFIRMATION === "true"

    let resend: Resend
    try {
      resend = getResend()
    } catch (error) {
      console.error(`[${requestId}] Resend not configured:`, error)
      return { 
        error: "Our booking system is temporarily unavailable. Please email us directly or try again later.", 
        success: false 
      }
    }

    const notificationResult = await sendEmailWithRetry(resend, {
      from,
      to: [to],
      subject: `New Quote Request from ${data.firstName} ${data.lastName}`,
      html: QuoteRequestEmail(data),
      replyTo: data.email,
    })

    if (!notificationResult.success) {
      console.error(`[${requestId}] Failed to send notification email:`, notificationResult.error)
      
      const isConfigError = 
        notificationResult.error?.includes("API key") ||
        notificationResult.error?.includes("authentication") ||
        notificationResult.error?.includes("unauthorized")
      
      if (isConfigError) {
        return { 
          error: "Our booking system is misconfigured. Please email us directly at the address on our site.", 
          success: false 
        }
      }
      
      const isRateLimit = notificationResult.error?.includes("429") || notificationResult.error?.includes("rate limit")
      if (isRateLimit) {
        return {
          error: "We're receiving high volume right now. Please try again in a few minutes or email us directly.",
          success: false
        }
      }
      
      return { 
        error: "Unable to submit your request right now. Please try again in a few minutes or email us directly.", 
        success: false 
      }
    }

    console.info(`[${requestId}] Notification email sent successfully`)

    if (sendGuestConfirmation) {
      const confirmationResult = await sendEmailWithRetry(resend, {
        from,
        to: [data.email],
        subject: "Thank you for your quote request - PINKYS UP",
        html: QuoteConfirmationEmail({
          firstName: data.firstName,
          lastName: data.lastName,
          eventDate: data.eventDate,
          eventType: data.eventType,
          services: data.services,
        }),
      })

      if (!confirmationResult.success) {
        console.warn(`[${requestId}] Failed to send confirmation email to guest:`, confirmationResult.error)
      } else {
        console.info(`[${requestId}] Confirmation email sent to guest`)
      }
    }

    console.info(`[${requestId}] Quote request processed successfully`)
    return { success: true }
  } catch (error) {
    console.error(`[${requestId}] Unexpected error processing quote form:`, error)
    return { 
      error: "An unexpected error occurred. Please try again or contact us directly.", 
      success: false 
    }
  }
}
