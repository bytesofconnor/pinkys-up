import { LandingDocument } from "@/components/service-landing"
import { landingMetadata } from "@/lib/landings"

export const metadata = landingMetadata("washington-dc")

export default function WashingtonDcPage() {
  return <LandingDocument id="washington-dc" />
}
