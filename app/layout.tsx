import type { Metadata } from "next"
import { Instrument_Serif, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getOrganizationSchema } from "@/lib/structured-data"
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
    default: "PINKYS UP | Zero-Proof Mocktails & Community Wellness",
    template: "%s | PINKYS UP"
  },
  description: "Zero-proof mocktails and community wellness experiences in Washington, DC and Minneapolis. Mobile mocktail bar for events and free wellness gatherings.",
  keywords: [
    "mobile bar",
    "mocktail bar",
    "zero proof drinks",
    "alcohol free bar",
    "beverage catering",
    "wedding bar service",
    "corporate events",
    "community wellness",
    "wellness events",
    "Washington DC",
    "Minneapolis",
    "Minnesota",
    "mocktails"
  ],
  authors: [{ name: "PINKYS UP" }],
  alternates: {
    canonical: "https://www.pinkysup.social"
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  openGraph: {
    title: "PINKYS UP | Zero-Proof Mocktails & Community Wellness",
    description: "Zero-proof mocktails and community wellness experiences in Washington, DC and Minneapolis. Mobile mocktail bar for events and free wellness gatherings.",
    url: "https://www.pinkysup.social",
    siteName: "PINKYS UP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PINKYS UP | Zero-Proof Mocktails & Community Wellness",
    description: "Zero-proof mocktails and community wellness experiences in Washington, DC and Minneapolis.",
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
      }
    ],
    apple: {
      url: "/favicon.png",
      type: "image/png",
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.NodeNode
}) {
  const organizationSchema = getOrganizationSchema()

  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="pt-20" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
