import { getSupabaseClient } from "@/lib/db"
import type { WellnessEvent } from "@/lib/events"

type EventRow = {
  id: string
  name: string
  description: string
  starts_at: string | null
  location: string
  time_zone: string
  registration_url: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export type EventInput = {
  name: string
  description: string
  startsAt: string | null
  location: string
  timeZone: string
  registrationUrl: string | null
  published: boolean
}

function isConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY)
}

function mapEvent(row: EventRow): WellnessEvent & { published: boolean } {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    startsAt: row.starts_at ?? undefined,
    location: row.location,
    timeZone: row.time_zone,
    registrationUrl: row.registration_url,
    published: row.published,
  }
}

export function eventsDatabaseConfigured() {
  return isConfigured()
}

export async function listPublishedEvents(): Promise<WellnessEvent[] | null> {
  if (!isConfigured()) return null

  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("community_events")
    .select("*")
    .eq("published", true)

  if (error) {
    console.error("Failed to load published events:", error.message)
    throw error
  }

  return ((data as EventRow[] | null) ?? []).map(mapEvent)
}

export async function listAllEvents(): Promise<(WellnessEvent & { published: boolean })[]> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("community_events")
    .select("*")

  if (error) {
    console.error("Failed to load events:", error.message)
    throw error
  }

  return ((data as EventRow[] | null) ?? []).map(mapEvent)
}

export async function getEventById(id: string): Promise<(WellnessEvent & { published: boolean }) | null> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("community_events")
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    console.error("Failed to load event:", error.message)
    throw error
  }

  return data ? mapEvent(data as EventRow) : null
}

export async function createEvent(input: EventInput): Promise<string> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from("community_events")
    .insert({
      name: input.name,
      description: input.description,
      starts_at: input.startsAt,
      location: input.location,
      time_zone: input.timeZone,
      registration_url: input.registrationUrl,
      published: input.published,
    } as never)
    .select("id")
    .single()

  if (error) {
    console.error("Failed to create event:", error.message)
    throw error
  }

  return (data as { id: string }).id
}

export async function updateEvent(id: string, input: EventInput): Promise<void> {
  const supabase = getSupabaseClient()
  const { error } = await supabase
    .from("community_events")
    .update({
      name: input.name,
      description: input.description,
      starts_at: input.startsAt,
      location: input.location,
      time_zone: input.timeZone,
      registration_url: input.registrationUrl,
      published: input.published,
      updated_at: new Date().toISOString(),
    } as never)
    .eq("id", id)

  if (error) {
    console.error("Failed to update event:", error.message)
    throw error
  }
}

export async function deleteEvent(id: string): Promise<void> {
  const supabase = getSupabaseClient()
  const { error } = await supabase.from("community_events").delete().eq("id", id)

  if (error) {
    console.error("Failed to delete event:", error.message)
    throw error
  }
}
