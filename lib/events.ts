import { whatsAppEventRegistrationUrl } from "@/lib/booking"
import eventsData from "@/data/events.json"

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

export const wellnessEvents: WellnessEvent[] = eventsData as WellnessEvent[]

export function getEventRegistrationHref(event: WellnessEvent) {
  return event.registrationUrl ?? whatsAppEventRegistrationUrl(event.name)
}

export function getUpcomingEvents(now = Date.now()): WellnessEvent[] {
  const dated = wellnessEvents
    .filter((event) => event.startsAt && new Date(event.startsAt).getTime() > now)
    .sort((a, b) => new Date(a.startsAt!).getTime() - new Date(b.startsAt!).getTime())

  const undated = wellnessEvents.filter((event) => !event.startsAt)

  return [...dated, ...undated]
}

export function getNextEvent(now = Date.now()): WellnessEvent | null {
  return getUpcomingEvents(now)[0] ?? null
}

export function getNextRegisterableEvent(now = Date.now()): WellnessEvent | null {
  return getUpcomingEvents(now).find((event) => event.registrationUrl) ?? null
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
