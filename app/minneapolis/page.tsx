import { JsonLd } from "@/components/json-ld"
import { CityLanding, generateCityMetadata } from "@/components/city-landing"
import { getBreadcrumbSchema } from "@/lib/structured-data"

export const metadata = generateCityMetadata("minneapolis")

export default function MinneapolisPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Minneapolis", path: "/minneapolis" },
        ])}
      />
      <CityLanding slug="minneapolis" />
    </>
  )
}
