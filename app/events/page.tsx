import Link from "next/link"
import type { Metadata } from "next"
import { CinematicBackdrop } from "@/components/cinematic-backdrop"
import { EventCountdown } from "@/components/event-countdown"
import { SectionHeading } from "@/components/section-heading"
import { UpcomingEvents } from "@/components/upcoming-events"
import { WhatsAppRSVPButton } from "@/components/whatsapp-rsvp-button"
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

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents()
  const nextEvent = getNextEvent()
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
      <section className="relative -mt-20 flex min-h-screen items-center justify-center overflow-hidden">
        <CinematicBackdrop
          imageSrc="/pexel.jpg"
          alt=""
          intensity="deep"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
          {nextEvent ? (
            <>
              <p
                className="mb-4 text-sm uppercase tracking-[0.35em] text-white"
                style={{ textShadow: "0 2px 16px rgba(0,0,0,0.85)" }}
              >
                {nextEvent.startsAt
                  ? formatHeroDate(nextEvent.startsAt, nextEvent.timeZone)
                  : "Date TBD"}
              </p>
              <h1
                className="mb-10 font-display text-5xl leading-[1.15] text-[#ffd0e4] sm:text-6xl md:text-7xl"
                style={{ textShadow: "0 2px 28px rgba(0,0,0,0.85)" }}
              >
                {nextEvent.name}
              </h1>
              {nextEvent.startsAt ? (
                <EventCountdown target={nextEvent.startsAt} />
              ) : null}
              <div className="mt-10">
                {nextEvent.registrationUrl ? (
                  <Link href={registerHref} target="_blank" rel="noopener noreferrer">
                    <button className="bg-[#be185d] px-10 py-6 text-base font-semibold uppercase tracking-[0.2em] text-white hover:bg-[#9d174d]">
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
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white">Pinky&apos;s Up</p>
              <h1 className="font-display text-5xl text-white sm:text-6xl">Events</h1>
              <p className="mt-6 text-lg text-white">
                The next community date is being scheduled.
              </p>
            </>
          )}
        </div>
      </section>

      <section className="container max-w-5xl px-4 py-24">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Upcoming Wellness Events"
            title="Find Your Next Way to Connect."
            description="Free community experiences in Washington, DC and Minneapolis — come move, connect, and explore wellness together."
          />
        </div>
        <UpcomingEvents events={upcomingEvents} />
      </section>
    </div>
  )
}
