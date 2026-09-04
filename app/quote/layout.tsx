import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Get a Quote for Your Event",
  description: "Book PINKYS UP mobile mocktail bar for your wedding, corporate event, or private celebration in DC or Minneapolis. Request a custom quote today.",
  alternates: {
    canonical: "https://www.pinkysup.social/quote"
  },
  openGraph: {
    title: "Get a Quote for Your Event | PINKYS UP",
    description: "Book our mobile mocktail bar for your wedding, corporate event, or private celebration. Custom quotes for DC and Minneapolis.",
    url: "https://www.pinkysup.social/quote",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Get a Quote for Your Event | PINKYS UP",
    description: "Book our mobile mocktail bar for your wedding, corporate event, or private celebration."
  }
}

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
