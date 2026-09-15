import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book the mocktail cart or a wellness gathering",
  description:
    "Request a PINKYS UP quote for a mobile mocktail bar or community-style event in Washington, DC or Minneapolis.",
  alternates: {
    canonical: "https://www.pinkysup.social/quote",
  },
  openGraph: {
    title: "Book PINKYS UP | Quote",
    description: "Book the mocktail cart or plan a community wellness gathering in Washington, DC or Minneapolis.",
    url: "https://www.pinkysup.social/quote",
    type: "website",
  },
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
