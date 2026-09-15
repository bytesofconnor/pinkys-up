import type { Metadata } from "next"
import Link from "next/link"
import { SectionHeading } from "@/components/section-heading"
import { JsonLd } from "@/components/json-ld"
import { faqs } from "@/lib/faq"
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "FAQ — Mocktail cart, wellness events, DC & Minneapolis",
  description:
    "Answers about PINKYS UP: zero-proof mocktail bar service in Washington, DC and Minneapolis, free community wellness events, booking, and the menu.",
  alternates: {
    canonical: "https://www.pinkysup.social/faq",
  },
  openGraph: {
    title: "FAQ | PINKYS UP",
    description:
      "Zero-proof mocktail cart, free wellness gatherings, and how to book in Washington, DC and Minneapolis.",
    url: "https://www.pinkysup.social/faq",
    type: "website",
  },
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <JsonLd data={getFaqSchema()} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeading
          as="h1"
          eyebrow="FAQ"
          title="What people ask before they book."
          description="Straight answers for ChatGPT, Google, and anyone planning a dry bar or a free wellness night."
        />
        <dl className="mt-12 space-y-8">
          {faqs.map((item) => (
            <div key={item.question}>
              <dt className="font-display text-2xl text-gray-900">{item.question}</dt>
              <dd className="mt-2 text-base leading-relaxed text-gray-700 sm:text-lg">{item.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-14 text-center text-sm text-gray-600">
          Ready to book?{" "}
          <Link href="/quote" className="font-medium text-[#9d174d] underline-offset-4 hover:underline">
            Request a quote
          </Link>{" "}
          or see{" "}
          <Link href="/events" className="font-medium text-[#9d174d] underline-offset-4 hover:underline">
            upcoming events
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
