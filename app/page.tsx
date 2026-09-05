import type { Metadata } from "next"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { GallerySection } from "@/components/gallery-section"
import { Testimonials } from "@/components/testimonials"
import { UpcomingEvents } from "@/components/upcoming-events"
import { SectionHeading } from "@/components/section-heading"
import { getUpcomingEvents } from "@/lib/events"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.pinkysup.social"
  },
  openGraph: {
    url: "https://www.pinkysup.social"
  }
}

export default function Home() {
  const upcomingEvents = getUpcomingEvents()

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      <section className="container max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <Link 
            href="/events"
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 sm:p-12 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="relative z-10">
              <h2 className="mb-3 sm:mb-4 font-display text-3xl sm:text-4xl text-gray-900">
                Community Events
              </h2>
              <p className="mb-4 sm:mb-6 text-base sm:text-lg text-gray-700">
                Free gatherings in Washington, DC and Minneapolis — come move, meet people, and explore wellness together.
              </p>
              <span className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.2em] text-[#9d174d] group-hover:underline">
                Explore Events →
              </span>
            </div>
            <div className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-gradient-to-br from-blue-200/50 to-cyan-200/50 blur-3xl transition-all duration-300 group-hover:scale-110" />
          </Link>

          <Link 
            href="/mocktails"
            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/20 bg-gradient-to-br from-teal-50 to-green-50 p-8 sm:p-12 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="relative z-10">
              <h2 className="mb-3 sm:mb-4 font-display text-3xl sm:text-4xl text-gray-900">
                Mobile Mocktails
              </h2>
              <p className="mb-4 sm:mb-6 text-base sm:text-lg text-gray-700">
                Minnesota-inspired zero-proof craft cocktails. Bring the bar cart experience to your celebration.
              </p>
              <span className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.2em] text-[#9d174d] group-hover:underline">
                View Drinks →
              </span>
            </div>
            <div className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-gradient-to-br from-teal-200/50 to-green-200/50 blur-3xl transition-all duration-300 group-hover:scale-110" />
          </Link>
        </div>
      </section>

      {upcomingEvents.length > 0 && (
        <section className="container max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-10 sm:mb-12">
            <SectionHeading
              eyebrow="Coming Up"
              title="Next Community Gatherings"
              description="Join us for movement, connection, and intentional wellness."
            />
          </div>
          <UpcomingEvents events={upcomingEvents.slice(0, 2)} />
          <p className="mt-8 sm:mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex min-h-[44px] items-center justify-center text-sm font-semibold uppercase tracking-[0.2em] text-[#9d174d] underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
            >
              See all upcoming events
            </Link>
          </p>
        </section>
      )}

      <GallerySection />
      <Testimonials />
      
      <div className="bg-gradient-to-br from-blue-50/50 to-teal-50/50">
        <div className="container max-w-3xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="mb-10 sm:mb-12">
            <SectionHeading
              title="Let's Create Something Special"
              description="Whether you're planning a private celebration or curious about our community events, we'd love to connect."
            />
          </div>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] sm:min-h-14 items-center justify-center rounded-full bg-[#9d174d] px-8 sm:px-10 py-3 sm:py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}
