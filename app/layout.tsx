import type { Metadata } from "next"
import { Instrument_Serif, Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
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
  title: "PINKYS UP DC",
  description: "Zero-proof mocktails and community wellness in Washington, DC and Minneapolis.",
  keywords: ["mobile bar", "beverage catering", "wedding bar service", "corporate events", "Washington DC", "Minneapolis", "Minnesota", "mocktails"],
  authors: [{ name: "PINKYS UP" }],
  openGraph: {
    title: "PINKYS UP - Mobile Bar Service",
    description: "Full-service beverage catering company providing exceptional experiences",
    url: "https://www.pinkysup.social",
    siteName: "PINKYS UP",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PINKYS UP - Mobile Bar Service",
    description: "Full-service beverage catering company providing exceptional experiences",
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
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`}>
      <body className="font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main id="main-content" className="pt-20" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
