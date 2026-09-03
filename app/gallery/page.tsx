import GalleryGrid from "@/components/gallery-grid"
import { SectionHeading } from "@/components/section-heading"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="container py-16 md:py-24">
        <div className="mb-14">
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
