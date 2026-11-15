import { LandingDocument } from "@/components/service-landing"
import { landingMetadata } from "@/lib/landings"

export const metadata = landingMetadata("minneapolis-weddings")

export default function MinneapolisWeddingsPage() {
  return <LandingDocument id="minneapolis-weddings" />
}
