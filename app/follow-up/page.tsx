import type { Metadata } from "next"
import { FollowUpForm } from "@/components/follow-up-form"
import { SectionHeading } from "@/components/section-heading"
import { followUpPageMetadata } from "@/lib/follow-up"

export const metadata: Metadata = followUpPageMetadata()

export default function FollowUpPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-white py-12 sm:py-20">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12">
          <SectionHeading
            as="h1"
            eyebrow="After your event"
            title="How was it?"
            description="Leave a rating and a short note. Tell Brenda if she may publish it."
          />
        </div>

        <div className="rounded-lg p-0 sm:p-8 bg-white/50 backdrop-blur-xs border-0 sm:border border-white/20">
          <FollowUpForm />
        </div>
      </div>
    </div>
  )
}
