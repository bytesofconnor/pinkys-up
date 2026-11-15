import Link from "next/link"
import { JsonLd } from "@/components/json-ld"
import { SectionHeading } from "@/components/section-heading"
import { TrackedLink } from "@/components/tracked-link"
import { contactHref, link } from "@/lib/destinations"
import {
  bookingSteps,
  getLanding,
  includedItems,
  landingSchemas,
  type Landing,
  type LandingId,
} from "@/lib/landings"

export function LandingDocument({ id }: { id: LandingId }) {
  return (
    <>
      {landingSchemas(id).map((data, index) => (
        <JsonLd key={`${id}-${index}`} data={data} />
      ))}
      <ServiceLanding id={id} />
    </>
  )
}

function InlineRuns({ runs }: { runs: Landing["paragraphs"][number] }) {
  return (
    <>
      {runs.map((run, index) =>
        run.type === "text" ? (
          <span key={index}>{run.text}</span>
        ) : (
          <Link
            key={index}
            href={link(run.to).path}
            className="font-medium text-[#9d174d] underline-offset-4 hover:underline"
          >
            {run.text}
          </Link>
        )
      )}
    </>
  )
}

export function ServiceLanding({ id }: { id: LandingId }) {
  const page = getLanding(id)
  const included = includedItems()

  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 via-white to-purple-50">
      <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
        <SectionHeading as="h1" eyebrow={page.eyebrow} title={page.title} description={page.lede} />
        <div className="mt-6 flex justify-center sm:mt-8">
          <TrackedLink
            href={link("contact").path}
            event="book_quote"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#9d174d] px-7 text-sm font-medium text-white transition-colors hover:bg-[#831843] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
          >
            Get a quote
          </TrackedLink>
        </div>
        <div className="mt-10 space-y-5 text-base leading-relaxed text-gray-700 sm:text-lg">
          {page.paragraphs.map((paragraph, index) => (
            <p key={index}>
              <InlineRuns runs={paragraph} />
            </p>
          ))}
          {page.eventsLine ? (
            <p>
              <InlineRuns runs={page.eventsLine} />
            </p>
          ) : null}
        </div>

        <section className="mt-14">
          <SectionHeading as="h2" align="left" title="Areas served" />
          <div className="mt-6 space-y-8">
            {page.areas.map((area) => (
              <div key={area.title}>
                <h3 className="font-display text-2xl text-gray-900">{area.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700 sm:text-lg">{area.body}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {area.places.map((place) => (
                    <li
                      key={place}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm text-gray-800"
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionHeading as="h2" align="left" title="Event types" />
          <ul className="mt-6 space-y-2 text-base text-gray-800 sm:text-lg">
            {page.eventTypes.map((eventType) => (
              <li key={eventType}>{eventType}</li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <SectionHeading as="h2" align="left" title="What is included" />
          <ul className="mt-6 space-y-6">
            {included.map((item) => (
              <li key={item.title}>
                <h3 className="font-display text-2xl text-gray-900">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-gray-700 sm:text-lg">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            The drinks are listed on the{" "}
            <Link
              href={link("mocktails").path}
              className="font-medium text-[#9d174d] underline-offset-4 hover:underline"
            >
              mocktails page
            </Link>
            .
          </p>
        </section>

        <section className="mt-14">
          <SectionHeading as="h2" align="left" title="How booking works" />
          <ol className="mt-6 space-y-6">
            {bookingSteps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="font-display text-2xl text-[#9d174d]">{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-700 sm:text-lg">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <SectionHeading as="h2" align="left" title="Questions" />
          <dl className="mt-6 space-y-8">
            {page.faqs.map((item) => (
              <div key={item.question}>
                <dt className="font-display text-2xl text-gray-900">{item.question}</dt>
                <dd className="mt-2 text-base leading-relaxed text-gray-700 sm:text-lg">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <nav aria-label="Related" className="mt-14">
          <SectionHeading as="h2" align="left" title="More from Pinkies Up" />
          <ul className="mt-6 space-y-3 text-base sm:text-lg">
            {page.related.map((id) => (
              <li key={id}>
                <Link
                  href={link(id).path}
                  className="font-medium text-[#9d174d] underline-offset-4 hover:underline"
                >
                  {link(id).label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={contactHref("mocktails")}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#9d174d] px-7 text-sm font-medium text-white hover:bg-[#831843]"
          >
            Request a quote
          </Link>
          <Link
            href={link("events").path}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-gray-900 px-7 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Community events
          </Link>
        </div>
      </div>
    </div>
  )
}
