'use client'

import * as React from "react"
import { motion as m } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { MocktailIllustration } from "@/components/mocktail-illustration"
import { mocktails } from "@/lib/mocktails"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <HeroSection
        imageSrc="/pinkies.png"
        objectPosition="64% 42%"
        intensity="clear"
        align="left"
        soften="barely"
        title="Mindfully Crafted Elixirs"
        description="Zero-proof drinks, built for the cart."
        actions={[
          {
            href: "/quote?for=mocktails",
            event: "book_quote",
            label: "Book this menu",
            variant: "primary",
          },
        ]}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20 pt-12 sm:pt-16 md:pt-24">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {mocktails.map((mocktail, index) => (
            <m.div
              key={mocktail.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-visible"
            >
              <div
                className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:rounded-[32px]"
                style={{ background: mocktail.glow }}
              />
              <div className="relative rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur-md sm:rounded-[32px] sm:p-8">
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="relative aspect-square w-full">
                    <div
                      className="pointer-events-none absolute -inset-4 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: mocktail.glow }}
                    />
                    <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/30 bg-white/20">
                      <div className="flex h-full w-full items-center justify-center p-3 transition-transform duration-700 group-hover:scale-105 sm:p-4">
                        <MocktailIllustration name={mocktail.name} instanceId={mocktail.name} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="mb-1.5 sm:mb-2 text-xs uppercase tracking-[0.24em] text-pink-600">
                        {mocktail.season}
                      </p>
                      <h3 className="font-display text-2xl sm:text-3xl text-gray-900">
                        {mocktail.name}
                      </h3>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700">{mocktail.description}</p>
                    <div>
                      <h4 className="font-medium mb-2 text-sm sm:text-base">Ingredients:</h4>
                      <ul className="list-disc list-inside text-sm sm:text-base text-gray-700">
                        {mocktail.ingredients.map((ingredient) => (
                          <li key={ingredient}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>
    </div>
  );
}
