export const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ""

const WHATSAPP_NUMBER = "15715014766"

export const whatsAppBookingUrl = `https://wa.me/${WHATSAPP_NUMBER}`

export function whatsAppMessageUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

type EventDetails = {
  name: string
  location?: string
  date?: string
  time?: string
}

export function whatsAppEventRegistrationUrl(details: EventDetails) {
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
  
  return whatsAppMessageUrl(message)
}
