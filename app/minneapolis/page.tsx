import { LandingDocument } from "@/components/service-landing"
import { landingMetadata } from "@/lib/landings"

export const metadata = landingMetadata("minneapolis")

export default function MinneapolisPage() {
  return <LandingDocument id="minneapolis" />
}
