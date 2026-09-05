'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendlyEmbed } from "@/components/calendly-embed"
import { SectionHeading } from "@/components/section-heading"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container max-w-6xl px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 sm:mb-24"
        >
          <div className="mb-6 sm:mb-8">
            <SectionHeading
              as="h1"
              align="left"
              title="Wellness Looks Different for Everyone."
            />
          </div>
          <div className="max-w-4xl space-y-4 sm:space-y-5 text-base sm:text-lg text-gray-700">
            <p>At Pinky&apos;s Up, we believe wellness doesn&apos;t have to look one way.</p>
            <p>
              Sometimes it means moving your body. Sometimes it means slowing down, connecting with others, trying something new, or simply creating space to feel good.
            </p>
            <p>
              Our community wellness events are designed to explore movement, mobility, flexibility, confidence, connection, and intentional self-care—in welcoming spaces in Washington, DC and Minneapolis.
            </p>
            <p className="font-medium text-gray-800">
              Come as you are. Move how you can. Find what feels good.
            </p>
          </div>
        </motion.section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-24"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-2xl sm:rounded-[32px] blur opacity-0 group-hover:opacity-75 transition-all duration-500" />
            <div className="relative backdrop-blur-md bg-white/30 p-6 sm:p-8 rounded-2xl sm:rounded-[32px] border border-white/20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-4 sm:mb-6 font-display text-3xl sm:text-4xl leading-tight text-gray-900 md:text-5xl"
              >
                Raise Your Glass, Not Your Proof! ✨
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg sm:text-xl mb-3 sm:mb-4 text-gray-800"
              >
                Welcome to the chicest mobile mocktail experience in DC and Minneapolis. Our bar cart brings sophistication and style to alcohol-free celebrations, one perfectly crafted drink at a time.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-600"
              >
                Ready to make your event sparkle? Let&apos;s get this party started! ✨
              </motion.p>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur opacity-0 group-hover:opacity-75 transition-all duration-500" />
            <div className="relative aspect-[4/5] rounded-full overflow-hidden border-2 border-white/20">
              <Image
                src="/pexel.jpg"
                alt="Mobile bar setup with white umbrella"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </motion.div>
        </motion.div>

        <div className="space-y-12 sm:space-y-16 max-w-3xl mx-auto">
          {[
            {
              step: "Step One.",
              title: "Submit a Quote",
              description: "Tell us about your celebration, gathering, or mocktail experience. We'll follow up with availability and next steps.",
              hasButton: true
            },
            {
              step: "Step Two.",
              title: "Customized Service Experience",
              description: "We design a menu, setup, and service plan that matches your people, your space, and your vibe.",
            }
          ].map((section, index) => (
            <motion.section
              key={section.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-2xl sm:rounded-[32px] blur opacity-0 group-hover:opacity-75 transition-all duration-500" />
              <div className="relative backdrop-blur-md bg-white/30 p-6 sm:p-12 rounded-2xl sm:rounded-[32px] border border-white/20 text-center">
                <h2 className="mb-2 sm:mb-3 font-display text-3xl sm:text-4xl text-[#be185d]">
                  {section.step}
                </h2>
                <h3 className="mb-3 sm:mb-4 font-display text-xl sm:text-2xl text-gray-900">{section.title}</h3>
                <p className="text-base sm:text-lg text-gray-600 mb-5 sm:mb-6">
                  {section.description}
                </p>
                {section.hasButton && (
                  <Link href="/quote" className="inline-block w-full sm:w-auto">
                    <Button 
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg min-h-[48px]"
                    >
                      Submit a Quote
                    </Button>
                  </Link>
                )}
              </div>
            </motion.section>
          ))}

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <SectionHeading
              title="Book a 30-min 1:1"
              description="Want to talk it through first? Reserve a half hour with Brenda."
            />
            <CalendlyEmbed />
          </motion.section>
        </div>
      </div>
    </div>
  )
}
