import Link from "next/link"
import { calendlyUrl, whatsAppBookingUrl } from "@/lib/booking"
import { Button } from "@/components/ui/button"

export function CalendlyEmbed() {
  if (calendlyUrl) {
    return (
      <div className="overflow-hidden rounded-[28px] border border-white/30 bg-white/60 shadow-lg">
        <iframe
          src={calendlyUrl}
          title="Book a 30-minute 1:1 with Pinky's Up"
          className="h-[700px] w-full"
        />
      </div>
    )
  }

  return (
    <div className="rounded-[28px] border border-white/30 bg-white/50 p-8 text-center shadow-lg backdrop-blur-md">
      <p className="mb-6 text-lg text-gray-700">
        Book a 30-minute 1:1 to talk through a mocktail experience, a community event, or what wellness looks like for you.
      </p>
      <Link href={whatsAppBookingUrl} target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-pink-600 hover:to-purple-700"
        >
          Book a 30-min 1:1
        </Button>
      </Link>
    </div>
  )
}
