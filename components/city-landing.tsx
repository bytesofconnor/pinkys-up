import type { Metadata } from "next"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"

type CityCopy = {
  slug: "washington-dc" | "minneapolis"
  title: string
  eyebrow: string
  description: string
  paragraphs: string[]
  eventsLine: string
}

const cities: Record<CityCopy["slug"], CityCopy> = {
  "washington-dc": {
    slug: "washington-dc",
    title: "Mobile mocktail bar in Washington, DC",
    eyebrow: "Washington, DC",
    description:
      "PINKYS UP is a zero-proof mocktail cart for DC weddings, parties, and brand events — plus free community wellness gatherings.",
    paragraphs: [
      "If you are looking for a non-alcoholic bar in Washington, DC that still feels like hospitality, that is the cart. We bring the drinks, glassware, and service so guests who are not drinking are part of the night.",
      "Bookings are for private events: weddings, birthday parties, office gatherings, and activations. There is no alcohol on the menu. Signature mocktails include Blush Hour, Plus One, and Mirrorball, with custom menus when you need them.",
      "PINKYS UP also hosts free wellness events in DC. Those dates live on the Events page. They are not ticketed parties with a hidden bar — they are community gatherings.",
    ],
    eventsLine: "See free DC-area gatherings on Events, or request a cart quote for your date.",
  },
  minneapolis: {
    slug: "minneapolis",
    title: "Mocktail cart in Minneapolis",
    eyebrow: "Minneapolis · Twin Cities",
    description:
      "PINKYS UP brings a zero-proof mocktail bar to Minneapolis events and hosts free community wellness gatherings in the Twin Cities.",
    paragraphs: [
      "Minneapolis and the Twin Cities get the same cart as DC: vintage-inspired service, fully non-alcoholic drinks, and a menu built for people who want a real pour without alcohol.",
      "Hire PINKYS UP for weddings, private parties, wellness pop-ups, and branded events. Tell us the neighborhood, guest count, and date on the quote form and Brenda will follow up.",
      "Community events in Minneapolis are free. When a date is on the calendar it appears on the Events page — we do not invent listings.",
    ],
    eventsLine: "See Twin Cities gatherings on Events, or book the cart for a private event.",
  },
}

export function generateCityMetadata(slug: CityCopy["slug"]): Metadata {
  const city = cities[slug]
  const path = `/${slug}`
  return {
    title: city.title,
    description: city.description,
    alternates: { canonical: `https://www.pinkysup.social${path}` },
    openGraph: {
      title: `${city.title} | PINKYS UP`,
      description: city.description,
      url: `https://www.pinkysup.social${path}`,
      type: "website",
    },
  }
}

export function CityLanding({ slug }: { slug: CityCopy["slug"] }) {
  const city = cities[slug]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeading as="h1" eyebrow={city.eyebrow} title={city.title} description={city.description} />
        <div className="mt-10 space-y-5 text-base leading-relaxed text-gray-700 sm:text-lg">
          {city.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p>{city.eventsLine}</p>
        </div>
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/quote?for=mocktails"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#9d174d] px-7 text-sm font-medium text-white hover:bg-[#831843]"
          >
            Request a quote
          </Link>
          <Link
            href="/events"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-gray-900 px-7 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Community events
          </Link>
        </div>
      </div>
    </div>
  )
}
