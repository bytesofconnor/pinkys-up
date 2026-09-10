import Link from "next/link"
import type { Metadata } from "next"
import { CinematicBackdrop } from "@/components/cinematic-backdrop"
import { EventCountdown } from "@/components/event-countdown"
import { SectionHeading } from "@/components/section-heading"
import { UpcomingEvents } from "@/components/upcoming-events"
import { WhatsAppRSVPButton } from "@/components/whatsapp-rsvp-button"
import { TrackedLink } from "@/components/tracked-link"
import {
  formatHeroDate,
  getEventRegistrationHref,
  getNextEvent,
  getUpcomingEvents,
} from "@/lib/events"
import { getEventSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Community Wellness Events",
  description: "Free wellness gatherings in Washington, DC and Minneapolis. Join us for movement, connection, and community experiences from PINKYS UP.",
  alternates: {
    canonical: "https://www.pinkysup.social/events"
  },
  openGraph: {
    title: "Community Wellness Events | PINKYS UP",
    description: "Free wellness gatherings in Washington, DC and Minneapolis. Join us for movement, connection, and community experiences.",
    url: "https://www.pinkysup.social/events",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Community Wellness Events | PINKYS UP",
    description: "Free wellness gatherings in Washington, DC and Minneapolis. Join us for movement, connection, and community experiences."
  }
}

export const dynamic = "force-dynamic"

export default async function EventsPage() {
  const upcomingEvents = await getUpcomingEvents()
  const nextEvent = await getNextEvent()
  const registerHref = nextEvent ? getEventRegistrationHref(nextEvent) : "/events"

  const eventSchemas = upcomingEvents
    .filter(event => event.startsAt)
    .map(event => getEventSchema({
      name: event.name,
      description: event.description,
      startsAt: event.startsAt ? new Date(event.startsAt) : null,
      endsAt: event.startsAt ? new Date(new Date(event.startsAt).getTime() + 2 * 60 * 60 * 1000) : null,
      location: event.location,
      registrationUrl: event.registrationUrl || undefined
    }))

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {eventSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <section className="relative -mt-20 flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden">
        <CinematicBackdrop
          imageSrc="/park.png"
          alt=""
          intensity="default"
          objectPosition="center 58%"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-28 text-center sm:px-6 sm:py-32">
          {nextEvent ? (
            <>
              <p
                className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/90 sm:text-xs"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}
              >
                {nextEvent.startsAt
                  ? formatHeroDate(nextEvent.startsAt, nextEvent.timeZone)
                  : "Date TBD"}
              </p>
              <h1
                className="mb-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#ffd0e4] sm:mb-8 sm:text-5xl md:text-6xl"
                style={{ textShadow: "0 2px 28px rgba(0,0,0,0.85)" }}
              >
                {nextEvent.name}
              </h1>
              {nextEvent.startsAt ? (
                <EventCountdown target={nextEvent.startsAt} />
              ) : null}
              <div className="mt-7 sm:mt-8">
                {nextEvent.registrationUrl ? (
                  <Link href={registerHref} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <button className="inline-flex min-h-12 items-center rounded-full bg-[#9d174d] px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843]">
                      Register
                      <span className="sr-only"> (opens in a new tab)</span>
                    </button>
                  </Link>
                ) : (
                  <WhatsAppRSVPButton
                    href={registerHref}
                    eventName={nextEvent.name}
                    variant="button"
                    size="lg"
                  />
                )}
              </div>
            </>
          ) : (
            <>
              <p
                className="mb-3 text-[11px] uppercase tracking-[0.32em] text-white/90 sm:text-xs"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}
              >
                Washington, DC · Minneapolis
              </p>
              <h1
                className="mb-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-[#ffd0e4] sm:text-5xl md:text-6xl"
                style={{ textShadow: "0 2px 28px rgba(0,0,0,0.85)" }}
              >
                The next date is being planned.
              </h1>
              <p
                className="mx-auto max-w-md text-sm text-white/90 sm:text-base"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}
              >
                Community gatherings will show up here when they&apos;re on the calendar.
              </p>
              <div className="mt-7 sm:mt-8">
                <TrackedLink
                  href="/quote?for=events"
                  event="book_quote"
                  className="inline-flex min-h-12 items-center rounded-full bg-[#9d174d] px-7 py-3 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843]"
                >
                  Host or partner with us
                </TrackedLink>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="container max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-10 sm:mb-14">
          <SectionHeading
            eyebrow="Upcoming Wellness Events"
            title="Find Your Next Way to Connect."
            description="Free community experiences in Washington, DC and Minneapolis — come move, connect, and explore wellness together."
          />
        </div>
        <UpcomingEvents events={upcomingEvents} />
        {upcomingEvents.length > 0 ? (
          <p className="mt-10 text-center sm:mt-12">
            <TrackedLink
              href="/quote?for=events"
              event="book_quote"
              className="inline-flex min-h-[44px] items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-[#9d174d] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
            >
              Host or partner with us
            </TrackedLink>
          </p>
        ) : null}
      </section>
    </div>
  )
}
