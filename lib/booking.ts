export const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ""

const WHATSAPP_NUMBER = "15715014766"

const BROADCAST_JOIN_MESSAGE =
  "Hi Pinky's Up! Please add me to the Pinkies Up broadcast list for event and pop-up updates."

const ONE_ON_ONE_MESSAGE = "Hi Pinky's Up! I'd like to book a 1:1 with Brenda."

type EventDetails = {
  name: string
  location?: string
  date?: string
  time?: string
}

export type WhatsAppIntent =
  | { kind: "bare_chat" }
  | { kind: "broadcast_join" }
  | { kind: "one_on_one" }
  | { kind: "event_rsvp"; event: EventDetails }

function eventRsvpMessage(details: EventDetails) {
  let message = `Hi Pinky's Up! I'd like to register for ${details.name}`

  if (details.location) {
    message += ` in ${details.location}`
  }

  if (details.date && details.time) {
    message += ` on ${details.date} at ${details.time}`
  } else if (details.date) {
    message += ` on ${details.date}`
  }

  message += "."

  return message
}

function messageFor(intent: WhatsAppIntent): string | undefined {
  switch (intent.kind) {
    case "bare_chat":
      return undefined
    case "broadcast_join":
      return BROADCAST_JOIN_MESSAGE
    case "one_on_one":
      return ONE_ON_ONE_MESSAGE
    case "event_rsvp":
      return eventRsvpMessage(intent.event)
  }
}

export function whatsAppUrl(intent: WhatsAppIntent): string {
  const text = messageFor(intent)
  const url = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!text) return url
  return `${url}?text=${encodeURIComponent(text)}`
}

export function whatsAppPhoneDisplay(): string {
  const country = WHATSAPP_NUMBER.slice(0, 1)
  const area = WHATSAPP_NUMBER.slice(1, 4)
  const exchange = WHATSAPP_NUMBER.slice(4, 7)
  const line = WHATSAPP_NUMBER.slice(7)
  return `${country}-${area}-${exchange}-${line}`
}

export const whatsAppTelephone = `+${WHATSAPP_NUMBER}`
