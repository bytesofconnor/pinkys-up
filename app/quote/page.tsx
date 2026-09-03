'use client'

import { QuoteForm } from "@/components/quote-form"
import { SectionHeading } from "@/components/section-heading"
import { motion } from "framer-motion"

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <SectionHeading
              as="h1"
              title="Ready to Elevate Your Event?"
              description="Let's create an unforgettable experience together."
            />
          </div>

          <div className="rounded-lg p-8 bg-white/50 backdrop-blur-sm border border-white/20">
            <QuoteForm />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
