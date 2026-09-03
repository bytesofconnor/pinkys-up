import GalleryGrid from "@/components/gallery-grid"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <div className="container py-12">
        <GalleryGrid />
      </div>
    </div>
  )
}
