import { QuoteForm } from "@/components/quote-form"
import { SectionHeading } from "@/components/section-heading"
import { fallDrinkNoteFromSearch } from "@/lib/fall-menu"
import { parseQuoteInterest } from "@/lib/quote"
import { link } from "@/lib/destinations"

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const initialServices = parseQuoteInterest(params.for)
  const initialAdditionalDetails = fallDrinkNoteFromSearch(params)

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-white py-12 sm:py-20">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <SectionHeading
            as="h1"
            eyebrow="Washington, DC · Minneapolis"
            title="How can we help?"
            description="Book the mocktail cart, plan a wellness gathering, or both — tell us a little and we'll follow up."
          />
        </div>

        <div className="rounded-lg p-0 sm:p-8 bg-white/50 backdrop-blur-xs border-0 sm:border border-white/20">
          <QuoteForm
            key={JSON.stringify([initialServices, initialAdditionalDetails])}
            initialServices={initialServices}
            initialAdditionalDetails={initialAdditionalDetails}
          />
        </div>
        <p className="mt-8 text-center text-sm text-gray-500">
          Looking for time with Brenda instead?{" "}
          <a href={link("oneOnOne").path} className="font-medium text-[#9d174d] underline-offset-4 hover:underline">
            Book a 1:1
          </a>
        </p>
      </div>
    </div>
  )
}
