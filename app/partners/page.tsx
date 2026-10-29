import type { Metadata } from "next"
import { PartnerForm } from "@/components/partner-form"
import { SectionHeading } from "@/components/section-heading"
import {
  PARTNER_ROSTER_EMPTY,
  partnerReasons,
  partners,
  partnersPageDescription,
  venueKindLabel,
} from "@/lib/partners"
import { SITE_URL } from "@/lib/site"

export const metadata: Metadata = {
  title: "Partner your venue",
  description: partnersPageDescription,
  alternates: { canonical: `${SITE_URL}/partners` },
  openGraph: {
    title: "Partner your venue | PINKYS UP",
    description: partnersPageDescription,
    url: `${SITE_URL}/partners`,
    type: "website",
  },
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="Washington, DC · Minneapolis"
          title="Bring the bar to your venue."
          description={partnersPageDescription}
        />

        <section className="mt-12">
          <h2 className="text-center font-display text-3xl text-gray-900 sm:text-4xl">
            What we bring
          </h2>
          <ul className="mt-8 space-y-8">
            {partnerReasons.map((reason) => (
              <li key={reason.id}>
                <h3 className="font-display text-2xl text-gray-900">{reason.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700 sm:text-lg">
                  {reason.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 text-center">
          <h2 className="font-display text-3xl text-gray-900 sm:text-4xl">Partners</h2>
          {partners.length === 0 ? (
            <p className="mt-4 text-lg text-gray-700">{PARTNER_ROSTER_EMPTY}</p>
          ) : (
            <ul className="mt-8 space-y-6 text-left">
              {partners.map((partner) => (
                <li key={partner.id}>
                  <h3 className="font-display text-2xl text-gray-900">{partner.name}</h3>
                  <p className="mt-1 text-gray-600">
                    {venueKindLabel(partner.kind)}
                    <span className="mx-2 text-black/20">·</span>
                    {partner.area}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-12 rounded-lg bg-white/50 p-0 backdrop-blur-xs sm:border sm:border-white/20 sm:p-8">
          <h2 className="mb-6 text-center font-display text-3xl text-gray-900 sm:text-4xl">
            Ask to partner
          </h2>
          <p className="mb-6 text-center text-base text-gray-600 sm:text-lg">
            Tell us the place and how to reach you.
          </p>
          <PartnerForm />
        </section>
      </div>
    </div>
  )
}
