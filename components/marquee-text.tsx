'use client'

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Mocktail {
  name: string;
  ingredients: string[];
  image: string;
  titleClass: string;
}

export function MarqueeText() {
  const reduceMotion = useReducedMotion()
  const mocktails: Mocktail[] = [
    {
      name: "Lake Superior Sunrise",
      ingredients: ["Wild Blueberry", "Cranberry", "Pine", "Lemon"],
      image: "/mocktails/filibuster-fizz.svg",
      titleClass: "from-blue-600 to-purple-700"
    },
    {
      name: "North Woods Spritz",
      ingredients: ["Elderflower", "Mint", "Maple", "Lime"],
      image: "/mocktails/winter-wonderland.svg",
      titleClass: "from-green-600 to-cyan-700"
    },
    {
      name: "Twin Cities Twilight",
      ingredients: ["Lavender", "Orange", "Butterfly Pea", "Vanilla"],
      image: "/mocktails/electoral-punch.svg",
      titleClass: "from-purple-600 to-blue-800"
    },
    {
      name: "Boundary Waters Breeze",
      ingredients: ["Cucumber", "Wild Berry", "Basil", "Lime"],
      image: "/mocktails/frost-and-fire.svg",
      titleClass: "from-teal-600 to-green-700"
    }
  ]

  // Duplicate the mocktails to create a seamless loop
  const duplicatedMocktails = [...mocktails, ...mocktails, ...mocktails]

  return (
    <div className="mr-4 flex-1 overflow-hidden whitespace-nowrap" aria-hidden="true">
      <motion.div
        initial={reduceMotion ? { x: 0 } : { x: "-100%" }}
        animate={reduceMotion ? { x: 0 } : { x: "0%" }}
        transition={{
          duration: reduceMotion ? 0 : 120,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "linear",
        }}
        className="inline-block whitespace-nowrap"
      >
        {duplicatedMocktails.map((mocktail, index) => (
          <span
            key={index}
            className="inline-flex items-center mx-12 group"
          >
            <div className="relative w-6 h-6 mr-3">
              <Image
                src={mocktail.image}
                alt={mocktail.name}
                fill
                className="object-contain"
              />
            </div>
            <span className={cn(
              "text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent",
              mocktail.titleClass
            )}>
              {mocktail.name}: {mocktail.ingredients.join(" + ")} ✨
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
