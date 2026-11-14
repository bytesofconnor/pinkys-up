export const ALLOWED_SERVICES = [
  "mocktails",
  "events",
  "bar",
  "mixologist",
  "glassware",
  "custom",
  "dj",
] as const

export type AllowedService = (typeof ALLOWED_SERVICES)[number]

export const DJ_SERVICE_DESCRIPTION = "Curated playlists and vibe setting for the event."

export const DJ_SERVICE_PROSE = `DJ service is ${
  DJ_SERVICE_DESCRIPTION.charAt(0).toLowerCase() + DJ_SERVICE_DESCRIPTION.slice(1)
}`

export const SERVICE_OPTIONS: {
  id: AllowedService
  title: string
  description: string
}[] = [
  {
    id: "mocktails",
    title: "Mocktail cart",
    description: "Bring the cart and menu to a wedding, party, or branded event.",
  },
  {
    id: "events",
    title: "Community events",
    description: "Host a wellness gathering, partner with us, or plan a private movement experience.",
  },
]

export const SERVICE_CHECKBOXES: {
  id: AllowedService
  title: string
  description?: string
}[] = [
  { id: "bar", title: "Bar Service" },
  { id: "mixologist", title: "Mixologist" },
  { id: "glassware", title: "Glassware" },
  { id: "custom", title: "Custom Menu" },
  { id: "dj", title: "DJ Service", description: DJ_SERVICE_DESCRIPTION },
]

const SERVICE_LABELS: Record<string, string> = {
  mocktails: "Mocktail cart",
  events: "Community events",
  bar: "Bar service",
  mixologist: "Mixologist",
  glassware: "Glassware",
  custom: "Custom menu",
  dj: "DJ service",
}

export function serviceLabel(id: string): string {
  return SERVICE_LABELS[id] ?? id
}

export function quoteNotificationEmail() {
  return process.env.QUOTE_NOTIFICATION_EMAIL?.trim() || "pereira.brenda61@gmail.com"
}

export function parseQuoteInterest(value?: string | string[]): AllowedService[] {
  const raw = Array.isArray(value) ? value.join(",") : (value ?? "")
  return raw
    .split(",")
    .map((part) => part.trim())
    .filter((part): part is AllowedService =>
      ALLOWED_SERVICES.includes(part as AllowedService)
    )
}
