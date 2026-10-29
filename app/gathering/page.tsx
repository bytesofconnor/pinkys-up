import type { Metadata } from "next"
import { GatheringForm } from "@/components/gathering-form"
import { SectionHeading } from "@/components/section-heading"
import { SITE_URL } from "@/lib/site"

const description =
  "Ask PINKYS UP to bring the mocktail cart to a house party, shower, or office event."

export const metadata: Metadata = {
  title: "Plan your gathering",
  description,
  alternates: {
    canonical: `${SITE_URL}/gathering`,
  },
  openGraph: {
    title: "Plan your gathering | PINKYS UP",
    description,
    url: `${SITE_URL}/gathering`,
    type: "website",
  },
}

export default function GatheringPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-white py-12 sm:py-20">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <SectionHeading
            as="h1"
            eyebrow="Washington, DC · Minneapolis"
            title="Bring the cart to your gathering."
            description="Share the city, about how many people, and a date if you have one."
          />
        </div>

        <div className="rounded-lg p-0 sm:p-8 bg-white/50 backdrop-blur-xs border-0 sm:border border-white/20">
          <GatheringForm />
        </div>
      </div>
    </div>
  )
}
