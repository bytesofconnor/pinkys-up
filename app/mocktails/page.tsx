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
    name: "The Filibuster Fizz",
    description: "A bipartisan blend of cranberry and ginger, garnished with fresh mint and lime. This effervescent drink bridges the aisle with its balanced flavors.",
    image: "/mocktails/filibuster-fizz.svg",
    season: "Political Collection",
    ingredients: ["Cranberry Juice", "Ginger Beer", "Fresh Lime", "Mint", "Sparkling Water"],
    themeClass: "from-red-400/30 to-blue-400/30",
  },
  {
    name: "Winter Wonderland",
    description: "A magical blend of coconut cream and blue curaçao syrup, topped with edible silver dust. This shimmering drink captures the essence of a snowy evening.",
    image: "/mocktails/winter-wonderland.svg",
    season: "Winter Collection",
    ingredients: ["Coconut Cream", "Blue Curaçao Syrup", "Silver Dust", "Vanilla"],
    themeClass: "from-cyan-400/30 to-blue-400/30",
  },
  {
    name: "The Electoral Punch",
    description: "A layered red, white, and blue masterpiece that celebrates democracy. Each layer represents the colors of liberty, perfectly balanced and united.",
    image: "/mocktails/electoral-punch.svg",
    season: "Political Collection",
    ingredients: ["Cranberry Juice", "Coconut Cream", "Blue Raspberry Syrup", "Lemon", "Star Fruit"],
    themeClass: "from-red-400/30 to-blue-500/30",
  },
  {
    name: "Frost & Fire",
    description: "A warming winter mocktail that combines spiced apple cider with a cool mint foam. The perfect balance of warm and cool sensations.",
    image: "/mocktails/frost-and-fire.svg",
    season: "Winter Collection",
    ingredients: ["Spiced Apple Cider", "Mint Foam", "Cinnamon", "Star Anise", "Fresh Apple"],
    themeClass: "from-orange-400/30 to-cyan-400/30",
  }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-16 md:pt-24">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionHeading
            as="h1"
            title="Mindfully Crafted Elixirs"
            description="Seasonal herbs, artisanal botanicals, and wellness-inspired blends."
          />
        </m.div>
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
                "absolute -inset-1 bg-gradient-to-br rounded-[32px] blur opacity-0 group-hover:opacity-75 transition-all duration-500",
                mocktail.themeClass
              )} />
              <div className="relative backdrop-blur-md bg-white/30 p-8 rounded-[32px] border border-white/20">
                <div className="flex flex-col gap-6">
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
                        className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-pink-600">
                        {mocktail.season}
                      </p>
                      <h3 className="font-display text-3xl text-gray-900">
                        {mocktail.name}
                      </h3>
                    </div>
                    <p className="text-gray-700">{mocktail.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Ingredients:</h4>
                      <ul className="list-disc list-inside text-gray-700">
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
