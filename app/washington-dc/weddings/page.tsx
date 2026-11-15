import { LandingDocument } from "@/components/service-landing"
import { landingMetadata } from "@/lib/landings"

export const metadata = landingMetadata("washington-dc-weddings")

export default function WashingtonDcWeddingsPage() {
  return <LandingDocument id="washington-dc-weddings" />
}
