import Link from "next/link"
import {
  formatEventDate,
  formatEventTime,
  type WellnessEvent,
} from "@/lib/events"

function EventRegistration({ event }: { event: WellnessEvent }) {
  if (!event.registrationUrl) {
    return (
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-pink-600">
        Registration TBD
      </p>
    )
  }

  return (
    <Link
      href={event.registrationUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs font-semibold uppercase tracking-[0.24em] text-[#be185d] underline-offset-4 hover:underline"
    >
      Register
    </Link>
  )
}

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
        <article key={event.id} className="py-8 first:pt-0 last:pb-0">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-pink-600">
                {event.startsAt ? formatEventDate(event.startsAt) : "Date TBD"}
              </p>
              <h3 className="font-display text-3xl leading-tight text-gray-900 md:text-4xl">
                {event.name}
              </h3>
              <p className="max-w-2xl text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-500">
                {event.startsAt ? formatEventTime(event.startsAt) : "Time TBD"}
                <span className="mx-2 text-black/20">·</span>
                {event.location}
              </p>
            </div>
            <div className="shrink-0 pb-1">
              <EventRegistration event={event} />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
