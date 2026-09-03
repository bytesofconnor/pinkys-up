import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { ServiceBars } from "@/components/service-bars"
import { GallerySection } from "@/components/gallery-section"
import { Testimonials } from "@/components/testimonials"
import { QuoteForm } from "@/components/quote-form"
import { FounderSection } from "@/components/founder-section"
import { UpcomingEvents } from "@/components/upcoming-events"
import { SectionHeading } from "@/components/section-heading"
import { getUpcomingEvents } from "@/lib/events"

export default function Home() {
  const upcomingEvents = getUpcomingEvents()

  return (
    <div className="min-h-screen">
      <HeroSection />
      <section className="container max-w-5xl px-4 py-24">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Community"
            title="Find Your Next Way to Connect."
            description="Free and accessible gatherings to move, meet people, and explore wellness together."
          />
        </div>
        <UpcomingEvents events={upcomingEvents.slice(0, 2)} />
        <p className="mt-10 text-center">
          <Link
            href="/events"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#9d174d] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
          >
            See all upcoming events
          </Link>
        </p>
      </section>
      <FounderSection />
      <div className="bg-secondary/30">
        <GallerySection />
      </div>
      <Testimonials />
      <ServiceBars />
      <div className="bg-primary/10">
        <div className="container py-24">
        <div className="mb-12">
            <SectionHeading
              title="Ready to Elevate Your Event?"
              description="Book the cart for a private gathering, celebration, or branded experience."
            />
          </div>
          <div className="max-w-xl mx-auto">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  )
}
