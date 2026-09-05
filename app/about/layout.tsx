import type { Metadata } from "next"
import { getLocalBusinessSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "About Our Mobile Mocktail Bar",
  description: "PINKYS UP brings zero-proof sophistication to DC and Minneapolis. Mobile mocktail bar for weddings, corporate events, and community wellness gatherings.",
  alternates: {
    canonical: "https://www.pinkysup.social/about"
  },
  openGraph: {
    title: "About Our Mobile Mocktail Bar | PINKYS UP",
    description: "Zero-proof sophistication and community wellness. Mobile mocktail bar for weddings, corporate events, and wellness gatherings in DC and Minneapolis.",
    url: "https://www.pinkysup.social/about",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Our Mobile Mocktail Bar | PINKYS UP",
    description: "Zero-proof sophistication and community wellness. Mobile mocktail bar for weddings, corporate events, and wellness gatherings."
  }
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const localBusinessSchema = getLocalBusinessSchema()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {children}
    </>
  )
}
