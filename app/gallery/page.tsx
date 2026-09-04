import type { Metadata } from "next"
import GalleryGrid from "@/components/gallery-grid"
import { SectionHeading } from "@/components/section-heading"

export const metadata: Metadata = {
  title: "Event Gallery",
  description: "Moments from our mocktail events and community wellness gatherings in Washington, DC and Minneapolis. See the magic in action.",
  alternates: {
    canonical: "https://www.pinkysup.social/gallery"
  },
  openGraph: {
    title: "Event Gallery | PINKYS UP",
    description: "Moments from our mocktail events and community wellness gatherings in DC and Minneapolis.",
    url: "https://www.pinkysup.social/gallery",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Event Gallery | PINKYS UP",
    description: "Moments from our mocktail events and community wellness gatherings in DC and Minneapolis."
  }
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="mb-10 sm:mb-14">
          <SectionHeading
            as="h1"
            eyebrow="Gallery"
            title="Moments Worth Raising a Glass To."
            description="Mocktails, community, and a little extra sparkle — from DC to Minneapolis."
          />
        </div>
        <GalleryGrid />
      </div>
    </div>
  )
}
