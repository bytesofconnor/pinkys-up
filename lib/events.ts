import { whatsAppEventRegistrationUrl } from "@/lib/booking"

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

export const wellnessEvents: WellnessEvent[] = [
  {
    id: "community-wellness-october",
    name: "Community Wellness Experience",
    description: "A welcoming morning to move, connect, and explore what feeling good looks like together.",
    startsAt: "2026-10-18T10:00:00-05:00",
    location: "Minneapolis, MN",
    timeZone: "America/Chicago",
    registrationUrl: null,
  },
  {
    id: "movement-connection-november",
    name: "Movement & Connection",
    description: "Gentle mobility, community, and intentional self-care in an accessible space.",
    startsAt: "2026-11-15T10:00:00-05:00",
    location: "Washington, DC",
    timeZone: "America/New_York",
    registrationUrl: null,
  },
  {
    id: "celebration-social-december",
    name: "Celebration & Wellness Social",
    description: "A zero-proof community gathering to close the season with connection and joy.",
    startsAt: "2026-12-13T15:00:00-06:00",
    location: "Minneapolis, MN",
    timeZone: "America/Chicago",
    registrationUrl: null,
  },
]

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
