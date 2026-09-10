import { calendlyUrl, whatsAppOneOnOneUrl } from "@/lib/booking"

export function CalendlyEmbed() {
  if (calendlyUrl) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/30 bg-white/60 shadow-sm sm:rounded-[32px]">
        <iframe
          src={calendlyUrl}
          title="Book a 30-minute 1:1 with Brenda"
          className="h-[700px] w-full"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-white/30 bg-white/60 p-8 text-center sm:rounded-[32px] sm:p-10">
      <p className="text-base text-gray-700 sm:text-lg">
        Pick a 30-minute window and we&apos;ll go from there.
      </p>
      <a
        href={whatsAppOneOnOneUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#9d174d] px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
      >
        Book a 30-min 1:1
        <span className="sr-only"> (opens WhatsApp)</span>
      </a>
    </div>
  )
}
