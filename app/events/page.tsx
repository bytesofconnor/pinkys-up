import Link from "next/link"
import type { Metadata } from "next"
import { EventCountdown } from "@/components/event-countdown"
import { HeroSection } from "@/components/hero-section"
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
import { JsonLd } from "@/components/json-ld"
import { getEventSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Free community wellness events in DC and Minneapolis",
  description:
    "Free PINKYS UP gatherings in Washington, DC and Minneapolis — movement, connection, and zero-proof hospitality. See upcoming dates and RSVP.",
  alternates: {
    canonical: "https://www.pinkysup.social/events",
  },
  openGraph: {
    title: "Community wellness events | PINKYS UP",
    description:
      "Free wellness gatherings in Washington, DC and Minneapolis from PINKYS UP.",
    url: "https://www.pinkysup.social/events",
    type: "website",
  },
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
        <JsonLd key={index} data={schema} />
      ))}
      {nextEvent ? (
        <HeroSection
          imageSrc="/park.png"
          objectPosition="center 58%"
          soften="barely"
        >
          <div className="relative">
            <p className="absolute bottom-full mb-4 w-full text-xs uppercase tracking-[0.35em] text-white/90 [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]">
              {nextEvent.startsAt
                ? formatHeroDate(nextEvent.startsAt, nextEvent.timeZone)
                : "Date TBD"}
            </p>
            <h1 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-[#ffd0e4] sm:text-5xl md:text-6xl [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
              {nextEvent.name}
            </h1>
          </div>
          {nextEvent.startsAt ? (
            <div className="mt-6 sm:mt-8">
              <EventCountdown target={nextEvent.startsAt} />
            </div>
          ) : null}
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            {nextEvent.registrationUrl ? (
              <Link href={registerHref} target="_blank" rel="noopener noreferrer" className="inline-block">
                <button className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#9d174d] px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] sm:w-auto">
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
        </HeroSection>
      ) : (
        <HeroSection
          imageSrc="/park.png"
          objectPosition="center 58%"
          soften="barely"
          title="The next date is being planned."
          description="Community gatherings will show up here when they're on the calendar."
          actions={[
            {
              href: "/quote?for=events",
              event: "book_quote",
              label: "Host or partner with us",
              variant: "primary",
            },
          ]}
        />
      )}

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
