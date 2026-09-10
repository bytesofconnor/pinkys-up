import { TrackedLink } from "@/components/tracked-link"
import { whatsAppMessageUrl } from "@/lib/booking"

export function EventsEmptyState() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="text-lg text-gray-700">
        The next community date is being planned.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Nothing is on the calendar yet. Check back soon, or tell us if you want to host one.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <TrackedLink
          href="/quote?for=events"
          event="book_quote"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#9d174d] px-6 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
        >
          Host or partner with us
        </TrackedLink>
        <a
          href={whatsAppMessageUrl("Hi Pinky's Up! Please let me know when the next community event is scheduled.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-gray-900 px-6 text-sm font-medium tracking-wide text-gray-900 transition-colors hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
        >
          Ask to be notified
          <span className="sr-only"> (opens WhatsApp)</span>
        </a>
      </div>
    </div>
  )
}
