import { createClient } from '@supabase/supabase-js'

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

let supabaseClient: ReturnType<typeof createClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing. Set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.')
    }

    supabaseClient = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })
  }

  return supabaseClient
}

export async function saveQuoteSubmission(data: {
  firstName: string
  lastName: string
  email: string
  phone: string
  services: string[]
  eventType: string
  eventDate: string
  location: string
  guestCount: string
  referralSource?: string
  additionalDetails?: string
  emailSent: boolean
  emailError?: string
}): Promise<{ success: boolean; error?: string; id?: string }> {
  try {
    const supabase = getSupabaseClient()

    const insertData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      services: data.services,
      event_type: data.eventType,
      event_date: data.eventDate,
      location: data.location,
      guest_count: parseInt(data.guestCount, 10),
      referral_source: data.referralSource || undefined,
      additional_details: data.additionalDetails || undefined,
      email_sent: data.emailSent,
      email_error: data.emailError || undefined,
    }

    const { data: result, error } = await supabase
      .from('quote_submissions')
      .insert(insertData as never)
      .select('id')
      .single()

    if (error) {
      console.error('Database error saving quote:', error)
      return { success: false, error: error.message }
    }

    const resultData = result as { id: string } | null
    return { success: true, id: resultData?.id }
  } catch (error) {
    console.error('Unexpected error saving quote:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function getRecentQuoteSubmissions(limit = 50): Promise<QuoteSubmission[]> {
  try {
    const supabase = getSupabaseClient()

    const { data, error } = await supabase
      .from('quote_submissions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Database error fetching quotes:', error)
      return []
    }

    return (data as QuoteSubmission[]) || []
  } catch (error) {
    console.error('Unexpected error fetching quotes:', error)
    return []
  }
}
