import { LandingDocument } from "@/components/service-landing"
import { landingMetadata } from "@/lib/landings"

export const metadata = landingMetadata("sober-wedding-bar")

export default function SoberWeddingBarPage() {
  return <LandingDocument id="sober-wedding-bar" />
}
