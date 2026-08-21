import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "PINKYS UP DC",
  description: "Elevate your event with our signature mocktails",
  keywords: ["mobile bar", "beverage catering", "wedding bar service", "corporate events", "Minneapolis", "Minnesota", "cocktail service"],
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
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="pt-20">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
