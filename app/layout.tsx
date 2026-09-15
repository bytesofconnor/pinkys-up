import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { SiteDirectory } from "@/components/site-directory"
import { PageView } from "@/components/page-view"
import { JsonLd } from "@/components/json-ld"
import { getSiteGraph } from "@/lib/structured-data"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pinkysup.social"),
  title: {
    default: "PINKYS UP | Mocktail Cart & Wellness Events in DC and Minneapolis",
    template: "%s | PINKYS UP",
  },
  description:
    "Mobile zero-proof mocktail bar for weddings and private events in Washington, DC and Minneapolis, plus free community wellness gatherings.",
  keywords: [
    "PINKYS UP",
    "mobile mocktail bar",
    "zero-proof mocktails",
    "non-alcoholic wedding bar",
    "Washington DC mocktail cart",
    "Minneapolis mocktail bar",
    "community wellness events",
  ],
  authors: [{ name: "Brenda Pereira Vargas" }, { name: "PINKYS UP" }],
  creator: "Brenda Pereira Vargas",
  alternates: {
    canonical: "https://www.pinkysup.social",
  },
  openGraph: {
    title: "PINKYS UP | Mocktail Cart & Wellness Events in DC and Minneapolis",
    description:
      "Zero-proof mocktail cart for events, and free wellness gatherings, in Washington, DC and Minneapolis.",
    url: "https://www.pinkysup.social",
    siteName: "PINKYS UP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PINKYS UP | Mocktail Cart & Wellness Events in DC and Minneapolis",
    description: "Zero-proof mocktails and community wellness in Washington, DC and Minneapolis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      {
        url: "/disco-mocktail.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],
    apple: {
      url: "/favicon.png",
      type: "image/png",
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <head>
        <JsonLd data={getSiteGraph()} />
      </head>
      <body className="font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="pt-20" tabIndex={-1}>
            {children}
          </main>
          <SiteDirectory />
          <SiteFooter />
        </div>
        <Analytics />
        <SpeedInsights />
        <PageView />
      </body>
    </html>
  )
}
