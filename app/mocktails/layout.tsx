import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Zero-Proof Mocktails Menu",
  description: "Mindfully crafted mocktails with seasonal herbs, artisanal botanicals, and wellness-inspired blends. Mobile mocktail bar serving DC and Minneapolis.",
  alternates: {
    canonical: "https://www.pinkysup.social/mocktails"
  },
  openGraph: {
    title: "Zero-Proof Mocktails Menu | PINKYS UP",
    description: "Mindfully crafted mocktails with seasonal herbs, artisanal botanicals, and wellness-inspired blends.",
    url: "https://www.pinkysup.social/mocktails",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Zero-Proof Mocktails Menu | PINKYS UP",
    description: "Mindfully crafted mocktails with seasonal herbs, artisanal botanicals, and wellness-inspired blends."
  }
}

export default function MocktailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
