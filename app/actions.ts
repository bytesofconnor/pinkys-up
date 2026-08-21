"use server"

import { headers } from "next/headers"
import { z } from "zod"
import { Resend } from "resend"
import { QuoteRequestEmail } from "@/emails/quote-request"
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

export async function submitQuoteForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const headerList = await headers()
    if (isRateLimited(getClientKey(headerList))) {
      return { error: "Too many requests. Please try again later.", success: false }
    }

    const validatedFields = formSchema.safeParse(formData)

    if (!validatedFields.success) {
      return { error: "Please fill out all required fields", success: false }
    }

    const { website, ...data } = validatedFields.data

    if (website?.trim()) {
      return { success: true }
    }

    const to = process.env.QUOTE_NOTIFICATION_EMAIL ?? "pereira.brenda61@gmail.com"
    const from = process.env.RESEND_FROM_EMAIL ?? "Pinkys Up <onboarding@resend.dev>"

    await getResend().emails.send({
      from,
      to: [to],
      subject: `New Quote Request from ${data.firstName} ${data.lastName}`,
      html: QuoteRequestEmail(data),
      replyTo: data.email,
    })

    return { success: true }
  } catch (error) {
    console.error("Error processing quote form")
    if (error instanceof Error && error.message === "Email service is not configured") {
      return { error: "Unable to send your request right now. Please try again later.", success: false }
    }
    return { error: "Failed to send your request. Please try again.", success: false }
  }
}
