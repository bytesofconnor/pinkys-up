import Image from "next/image"
import type { Metadata } from "next"
import { CalendlyEmbed } from "@/components/calendly-embed"
import { SectionHeading } from "@/components/section-heading"

export const metadata: Metadata = {
  title: "1:1 with Brenda",
  description: "Book professional 1:1 time with Brenda Pereira Vargas of PINKYS UP — wellness, gatherings, and working together in Washington, DC and Minneapolis.",
  alternates: {
    canonical: "https://www.pinkysup.social/1-1"
  },
  openGraph: {
    title: "1:1 with Brenda | PINKYS UP",
    description: "Professional 1:1 time with Brenda — wellness, gatherings, and working together.",
    url: "https://www.pinkysup.social/1-1",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "1:1 with Brenda | PINKYS UP",
    description: "Professional 1:1 time with Brenda — wellness, gatherings, and working together."
  }
}

export default function OneOnOnePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container max-w-5xl px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="mb-10 sm:mb-14">
          <SectionHeading
            as="h1"
            eyebrow="Professional services"
            title="A 1:1 with Brenda."
            description="Time with her — not a cart quote, not an RSVP. For the work that needs a conversation first."
          />
        </div>

        <div className="mb-12 grid items-center gap-10 md:grid-cols-2 md:gap-14 sm:mb-16">
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full border-2 border-white/40">
            <Image
              src="/brenda-capital.JPEG"
              alt="Brenda Pereira Vargas, founder of PINKYS UP"
              fill
              priority
              className="object-cover object-[50%_26%]"
              sizes="(min-width: 768px) 400px, 80vw"
            />
          </div>
          <div className="space-y-4 text-base text-gray-700 sm:text-lg">
            <p>
              Brenda works 1:1 with people and teams who want a clearer next step — a wellness gathering, a collaboration, or how PINKYS UP could show up for their people.
            </p>
            <p>
              Sessions are 30 minutes. Washington, DC and Minneapolis, or a call if you&apos;re elsewhere.
            </p>
          </div>
        </div>

        <CalendlyEmbed />
      </div>
    </div>
  )
}
