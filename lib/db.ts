import { fetchMutation, fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { convexConfigured, getAdminToken } from "@/lib/convex"
import type { AllowedService } from "@/lib/quote"

export type QuoteSubmission = {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  services: string[]
  event_type: string
  event_date: string
  location: string
  guest_count: number
  referral_source?: string
  additional_details?: string
  email_sent: boolean
  email_error?: string
}

export async function saveQuoteSubmission(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  services: AllowedService[]
  eventType: string
  eventDate: string
  location: string
  guestCount: string
  referralSource?: string
  additionalDetails?: string
  emailSent: boolean
  emailError?: string
}): Promise<{ success: boolean; error?: string; id?: string }> {
  if (!convexConfigured()) {
    return { success: false, error: "Convex is not configured" }
  }

  try {
    const id = await fetchMutation(api.quotes.create, {
      adminToken: getAdminToken(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      services: data.services,
      eventType: data.eventType,
      eventDate: data.eventDate,
      location: data.location,
      guestCount: parseInt(data.guestCount, 10),
      referralSource: data.referralSource || undefined,
      additionalDetails: data.additionalDetails || undefined,
      emailSent: data.emailSent,
      emailError: data.emailError || undefined,
    })

    return { success: true, id }
  } catch (error) {
    console.error("Unexpected error saving quote:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export async function getRecentQuoteSubmissions(limit = 50): Promise<QuoteSubmission[]> {
  if (!convexConfigured()) {
    return []
  }

  try {
    const data = await fetchQuery(api.quotes.listRecent, {
      adminToken: getAdminToken(),
      limit,
    })

    return data.map((quote) => ({
      id: quote._id,
      created_at: new Date(quote._creationTime).toISOString(),
      first_name: quote.firstName,
      last_name: quote.lastName,
      email: quote.email,
      phone: quote.phone,
      services: quote.services,
      event_type: quote.eventType,
      event_date: quote.eventDate,
      location: quote.location,
      guest_count: quote.guestCount,
      referral_source: quote.referralSource,
      additional_details: quote.additionalDetails,
      email_sent: quote.emailSent,
      email_error: quote.emailError,
    }))
  } catch (error) {
    console.error("Unexpected error fetching quotes:", error)
    return []
  }
}
