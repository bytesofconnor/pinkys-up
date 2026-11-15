import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ServiceBars } from "@/components/service-bars"
import { FounderSection } from "@/components/founder-section"
import { UpcomingEvents } from "@/components/upcoming-events"
import { SectionHeading } from "@/components/section-heading"
import { TrackedLink } from "@/components/tracked-link"
import { AboutPinkys } from "@/components/about-pinkys"
import { whatsAppUrl } from "@/lib/booking"
import { getUpcomingEvents } from "@/lib/events"
import { contactHref, link } from "@/lib/destinations"

export const metadata: Metadata = {
  title: {
    absolute: "Pinkies Up, zero-proof mocktail cart in DC and Minneapolis",
  },
  description:
    "Pinkies Up is Brenda Pereira Vargas's zero-proof mocktail cart for weddings and private events in Washington, DC and Minneapolis. Community gatherings are listed when a date is booked.",
  alternates: {
    canonical: "https://www.pinkysup.social",
  },
  openGraph: {
    title: "Pinkies Up, zero-proof mocktail cart in DC and Minneapolis",
    description:
      "Book the PINKYS UP cart for weddings and private events in Washington, DC and Minneapolis. Community dates appear when they are booked.",
    url: "https://www.pinkysup.social",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pinkies Up, zero-proof mocktail cart in DC and Minneapolis",
    description:
      "Book the PINKYS UP cart for weddings and private events in Washington, DC and Minneapolis. Community dates appear when they are booked.",
  },
}

export default async function Home() {
  const upcomingEvents = await getUpcomingEvents()

  return (
    <div className="min-h-screen">
      <HeroSection
        imageSrc="/park.png"
        objectPosition="center 58%"
        soften="barely"
        description="Book the zero-proof mocktail cart for weddings and private events in Washington, DC and Minneapolis."
        actions={[
          {
            href: contactHref("mocktails"),
            event: "book_quote",
            label: "Book the cart",
            variant: "primary",
          },
          {
            href: link("events").path,
            event: "explore_events",
            label: "Join a community event",
            variant: "secondary",
          },
        ]}
      />
      <ServiceBars />
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
          <div className="mt-8 flex flex-col items-center gap-3 text-center sm:mt-10">
            <TrackedLink
              href={link("events").path}
              event="see_all_events"
              className="inline-flex min-h-[44px] items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-[#9d174d] underline-offset-4 hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
            >
              See all upcoming events
            </TrackedLink>
            <TrackedLink
              href={whatsAppUrl({ kind: "broadcast_join" })}
              event="join_broadcast"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-[#9d174d] underline-offset-4 hover:underline focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
            >
              Get event updates on WhatsApp
            </TrackedLink>
          </div>
        ) : null}
      </section>
      <AboutPinkys />
      <FounderSection />
    </div>
  )
}
