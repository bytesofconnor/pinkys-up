import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ServiceBars } from "@/components/service-bars"
import { FounderSection } from "@/components/founder-section"
import { UpcomingEvents } from "@/components/upcoming-events"
import { SectionHeading } from "@/components/section-heading"
import { TrackedLink } from "@/components/tracked-link"
import { getUpcomingEvents } from "@/lib/events"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.pinkysup.social"
  },
  openGraph: {
    url: "https://www.pinkysup.social"
  }
}

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents()

  return (
    <div className="min-h-screen">
      <HeroSection imageSrc="/cover.png" objectPosition="center 48%" soften="barely" />
      <section className="container max-w-5xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="mb-10 sm:mb-14">
          <SectionHeading
            eyebrow="Come to an event"
            title="Find Your Next Way to Connect."
            description="Free gatherings in Washington, DC and Minneapolis — come move, meet people, and explore wellness together."
          />
        </div>
        <UpcomingEvents events={upcomingEvents.slice(0, 2)} />
        {upcomingEvents.length > 0 ? (
          <p className="mt-8 sm:mt-10 text-center">
            <TrackedLink
              href="/events"
              event="see_all_events"
              className="inline-flex min-h-[44px] items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-[#9d174d] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
            >
              See all upcoming events
            </TrackedLink>
          </p>
        ) : null}
      </section>
      <ServiceBars />
      <FounderSection />
    </div>
  )
}
