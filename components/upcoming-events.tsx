import Link from "next/link"
import {
  formatEventDate,
  formatEventTime,
  getEventRegistrationHref,
  type WellnessEvent,
} from "@/lib/events"

export function UpcomingEvents({ events }: { events: WellnessEvent[] }) {
  if (events.length === 0) {
    return (
      <p className="text-center text-lg text-gray-600">
        New community dates are on the way. Check back soon.
      </p>
    )
  }

  return (
    <div className="divide-y divide-black/10">
      {events.map((event) => (
        <article key={event.id} className="py-6 sm:py-8 first:pt-0 last:pb-0">
          <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2 sm:space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-pink-600">
                {event.startsAt
                  ? formatEventDate(event.startsAt, event.timeZone)
                  : "Date TBD"}
              </p>
              <h3 className="font-display text-2xl leading-tight text-gray-900 sm:text-3xl md:text-4xl">
                {event.name}
              </h3>
              <p className="max-w-2xl text-gray-600 text-sm sm:text-base">{event.description}</p>
              <p className="text-sm text-gray-500">
                {event.startsAt
                  ? formatEventTime(event.startsAt, event.timeZone)
                  : "Time TBD"}
                <span className="mx-2 text-black/20">·</span>
                {event.location}
              </p>
            </div>
            <div className="shrink-0 pb-1">
              <Link
                href={getEventRegistrationHref(event)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center px-6 py-3 text-xs font-semibold uppercase tracking-[0.24em] text-white bg-[#be185d] rounded-full hover:bg-[#9d174d] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#be185d]"
              >
                {event.registrationUrl ? "Register" : "Register via WhatsApp"}
                <span className="sr-only"> (opens in a new tab)</span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
