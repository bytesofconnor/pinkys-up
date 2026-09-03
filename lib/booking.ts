export const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ""

const WHATSAPP_NUMBER = "15715014766"

export const whatsAppBookingUrl = `https://wa.me/${WHATSAPP_NUMBER}`

export function whatsAppMessageUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export function whatsAppEventRegistrationUrl(eventName: string) {
  return whatsAppMessageUrl(
    `Hi Pinky's Up! I'd like to register for ${eventName}.`
  )
}
