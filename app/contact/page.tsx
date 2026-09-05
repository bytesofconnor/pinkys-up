import type { Metadata } from "next"
import { SectionHeading } from "@/components/section-heading"
import { QuoteForm } from "@/components/quote-form"

export const metadata: Metadata = {
  title: "Contact | PINKYS UP",
  description: "Get in touch with Pinky's Up for mobile mocktail experiences, community events, and wellness celebrations in DC and Minneapolis.",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container max-w-3xl px-4 py-24">
        <div className="mb-12">
          <SectionHeading
            as="h1"
            title="Let's Connect"
            description="Ready to book a mobile mocktail experience or have questions about our community events? We'd love to hear from you."
          />
        </div>
        <div className="rounded-3xl border border-white/20 bg-white/50 p-8 shadow-xl backdrop-blur-sm">
          <QuoteForm />
        </div>
      </div>
    </div>
  )
}
