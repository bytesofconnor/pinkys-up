import { fetchMutation, fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { convexConfigured, getAdminToken } from "@/lib/convex"
import type { WellnessEvent } from "@/lib/events"

type EventRecord = WellnessEvent & { published: boolean }

export type EventInput = {
  name: string
  description: string
  startsAt: string | null
  location: string
  timeZone: string
  registrationUrl: string | null
  published: boolean
}

function mapEvent(row: {
  _id: string
  name: string
  description: string
  startsAt: string | null
  location: string
  timeZone: string
  registrationUrl: string | null
  published: boolean
}): EventRecord {
  return {
    id: row._id,
    name: row.name,
    description: row.description,
    startsAt: row.startsAt ?? undefined,
    location: row.location,
    timeZone: row.timeZone,
    registrationUrl: row.registrationUrl,
    published: row.published,
  }
}

export function eventsDatabaseConfigured() {
  return convexConfigured()
}

export async function listPublishedEvents(): Promise<WellnessEvent[] | null> {
  if (!convexConfigured()) return null

  const data = await fetchQuery(api.events.listPublished, {})
  return data.map(mapEvent)
}

export async function listAllEvents(): Promise<EventRecord[]> {
  const data = await fetchQuery(api.events.listAll, {
    adminToken: getAdminToken(),
  })
  return data.map(mapEvent)
}

export async function getEventById(id: string): Promise<EventRecord | null> {
  try {
    const data = await fetchQuery(api.events.get, {
      adminToken: getAdminToken(),
      eventId: id as Id<"communityEvents">,
    })
    return data ? mapEvent(data) : null
  } catch (error) {
    console.error("Failed to load event:", error)
    return null
  }
}

export async function createEvent(input: EventInput): Promise<string> {
  return await fetchMutation(api.events.create, {
    adminToken: getAdminToken(),
    ...input,
  })
}

export async function updateEvent(id: string, input: EventInput): Promise<void> {
  await fetchMutation(api.events.update, {
    adminToken: getAdminToken(),
    eventId: id as Id<"communityEvents">,
    ...input,
  })
}

export async function deleteEvent(id: string): Promise<void> {
  await fetchMutation(api.events.remove, {
    adminToken: getAdminToken(),
    eventId: id as Id<"communityEvents">,
  })
}
