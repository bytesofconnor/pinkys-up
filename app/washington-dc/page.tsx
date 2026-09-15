import { JsonLd } from "@/components/json-ld"
import { CityLanding, generateCityMetadata } from "@/components/city-landing"
import { getBreadcrumbSchema } from "@/lib/structured-data"

export const metadata = generateCityMetadata("washington-dc")

export default function WashingtonDcPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Washington, DC", path: "/washington-dc" },
        ])}
      />
      <CityLanding slug="washington-dc" />
    </>
  )
}
