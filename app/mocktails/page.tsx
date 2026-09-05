'use client'

import * as React from "react"
import { motion as m } from "framer-motion"
import Image from "next/image"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

interface Mocktail {
  name: string;
  description: string;
  image: string;
  season: string;
  ingredients: string[];
  themeClass: string;
}

const mocktails: Mocktail[] = [
  {
    name: "Lake Superior Sunrise",
    description: "Crisp cranberry and wild blueberry with a hint of pine, garnished with fresh rosemary and lemon. A refreshing tribute to Minnesota's northern shores.",
    image: "/mocktails/filibuster-fizz.svg",
    season: "Minnesota Collection",
    ingredients: ["Wild Blueberry", "Cranberry Juice", "Pine Syrup", "Fresh Lemon", "Rosemary"],
    themeClass: "from-blue-400/30 to-purple-400/30",
  },
  {
    name: "North Woods Spritz",
    description: "A woodland blend of elderflower and fresh mint with a touch of maple, topped with sparkling water. Captures the essence of Minnesota's pristine forests.",
    image: "/mocktails/winter-wonderland.svg",
    season: "Minnesota Collection",
    ingredients: ["Elderflower", "Fresh Mint", "Maple Syrup", "Sparkling Water", "Lime"],
    themeClass: "from-green-400/30 to-cyan-400/30",
  },
  {
    name: "Twin Cities Twilight",
    description: "A sophisticated layered drink featuring lavender and citrus, representing the vibrant blend of Minneapolis and St. Paul. Elegant and balanced.",
    image: "/mocktails/electoral-punch.svg",
    season: "Minnesota Collection",
    ingredients: ["Lavender Syrup", "Fresh Orange", "Lemon", "Butterfly Pea Tea", "Vanilla"],
    themeClass: "from-purple-400/30 to-blue-500/30",
  },
  {
    name: "Boundary Waters Breeze",
    description: "A refreshing blend of cucumber and basil with a hint of wild berry, finished with a splash of tonic. Cool, clean, and endlessly drinkable.",
    image: "/mocktails/frost-and-fire.svg",
    season: "Minnesota Collection",
    ingredients: ["Fresh Cucumber", "Wild Berry Syrup", "Basil", "Tonic Water", "Lime"],
    themeClass: "from-teal-400/30 to-green-400/30",
  }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20 pt-12 sm:pt-16 md:pt-24">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <SectionHeading
            as="h1"
            title="Mobile Mocktails"
            description="Minnesota-inspired zero-proof craft cocktails. Bring the bar cart experience to your celebration — elegant, refreshing, and unforgettable."
          />
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8"
          >
            <a
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#9d174d] px-10 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
            >
              Book Your Experience
            </a>
          </m.div>
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {mocktails.map((mocktail, index) => (
            <m.div
              key={mocktail.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className={cn(
                "absolute -inset-1 bg-gradient-to-br rounded-2xl sm:rounded-[32px] blur opacity-0 group-hover:opacity-75 transition-all duration-500",
                mocktail.themeClass
              )} />
              <div className="relative backdrop-blur-md bg-white/30 p-5 sm:p-8 rounded-2xl sm:rounded-[32px] border border-white/20">
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="relative w-full aspect-square">
                    <div className={cn(
                      "absolute -inset-1 bg-gradient-to-br rounded-full blur opacity-0 group-hover:opacity-75 transition-all duration-500",
                      mocktail.themeClass
                    )} />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                      <Image
                        src={mocktail.image}
                        alt={mocktail.name}
                        fill
                        className="object-contain p-6 sm:p-8 transition-transform duration-700 group-hover:scale-105"
                      />
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
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="mx-auto max-w-2xl rounded-3xl border border-white/20 bg-white/40 px-8 py-12 backdrop-blur-sm">
            <h3 className="mb-4 font-display text-3xl text-gray-900">
              Ready to Elevate Your Event?
            </h3>
            <p className="mb-8 text-lg text-gray-700">
              Book the cart for a private gathering, celebration, or branded experience.
            </p>
            <a
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#9d174d] px-10 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
            >
              Get in Touch
            </a>
          </div>
        </m.div>
      </div>
    </div>
  );
}
