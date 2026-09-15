import type { Metadata } from "next"
import { JsonLd } from "@/components/json-ld"
import { getBreadcrumbSchema, getMenuSchema } from "@/lib/structured-data"

export const metadata: Metadata = {
  title: "Zero-proof mocktail menu",
  description:
    "Signature non-alcoholic mocktails from PINKYS UP: Blush Hour, Plus One, and Mirrorball. Mobile mocktail bar for Washington, DC and Minneapolis events.",
  alternates: {
    canonical: "https://www.pinkysup.social/mocktails",
  },
  openGraph: {
    title: "Zero-proof mocktail menu | PINKYS UP",
    description:
      "Blush Hour, Plus One, and Mirrorball — zero-proof drinks for the mobile cart in DC and Minneapolis.",
    url: "https://www.pinkysup.social/mocktails",
    type: "website",
  },
}

export default function MocktailsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <JsonLd data={getMenuSchema()} />
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Mocktails", path: "/mocktails" },
        ])}
      />
      {children}
    </>
  )
}
