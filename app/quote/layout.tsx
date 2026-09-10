import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get in Touch",
  description: "Book the PINKYS UP mocktail cart or plan a community wellness gathering in Washington, DC or Minneapolis.",
  alternates: {
    canonical: "https://www.pinkysup.social/quote"
  },
  openGraph: {
    title: "Get in Touch | PINKYS UP",
    description: "Book the mocktail cart or plan a community wellness gathering in Washington, DC or Minneapolis.",
    url: "https://www.pinkysup.social/quote",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Get in Touch | PINKYS UP",
    description: "Book the mocktail cart or plan a community wellness gathering in Washington, DC or Minneapolis."
  }
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
