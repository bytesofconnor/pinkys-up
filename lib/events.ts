import { whatsAppEventRegistrationUrl } from "@/lib/booking"
import eventsData from "@/data/events.json"
import { eventsDatabaseConfigured, listPublishedEvents } from "@/lib/events-db"

export const EVENT_TIME_ZONE = "America/Chicago"

export type WellnessEvent = {
  id: string
  name: string
  description: string
  startsAt?: string
  location: string
  timeZone: string
  registrationUrl: string | null
}

function sortUpcoming(events: WellnessEvent[], now: number): WellnessEvent[] {
  const dated = events
    .filter((event) => event.startsAt && new Date(event.startsAt).getTime() > now)
    .sort((a, b) => new Date(a.startsAt!).getTime() - new Date(b.startsAt!).getTime())

  const undated = events.filter((event) => !event.startsAt)

  return [...dated, ...undated]
}

async function loadEvents(): Promise<WellnessEvent[]> {
  if (eventsDatabaseConfigured()) {
    try {
      const fromDb = await listPublishedEvents()
      if (fromDb) return fromDb
    } catch (error) {
      console.error("Falling back to local events file:", error)
    }
  }

  return eventsData as WellnessEvent[]
}

export async function getUpcomingEvents(now = Date.now()): Promise<WellnessEvent[]> {
  return sortUpcoming(await loadEvents(), now)
}

export async function getNextEvent(now = Date.now()): Promise<WellnessEvent | null> {
  const upcoming = await getUpcomingEvents(now)
  return upcoming[0] ?? null
}

export async function getNextRegisterableEvent(now = Date.now()): Promise<WellnessEvent | null> {
  const upcoming = await getUpcomingEvents(now)
  return upcoming.find((event) => event.registrationUrl) ?? null
}

export function getEventRegistrationHref(event: WellnessEvent) {
  if (event.registrationUrl) {
    return event.registrationUrl
  }

  return whatsAppEventRegistrationUrl({
    name: event.name,
    location: event.location,
    date: event.startsAt ? formatEventDate(event.startsAt, event.timeZone) : undefined,
    time: event.startsAt ? formatEventTime(event.startsAt, event.timeZone) : undefined,
  })
}

export function formatEventDate(iso: string, timeZone = EVENT_TIME_ZONE): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  }).format(new Date(iso))
}

export function formatHeroDate(iso: string, timeZone = EVENT_TIME_ZONE): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  })
    .format(new Date(iso))
    .toUpperCase()
}

export function formatEventTime(iso: string, timeZone = EVENT_TIME_ZONE): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(new Date(iso))
}
