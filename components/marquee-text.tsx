'use client'

import { motion, useReducedMotion } from "framer-motion"
import { MocktailIllustration } from "@/components/mocktail-illustration"
import { mocktails } from "@/lib/mocktails"
import { cn } from "@/lib/utils"

export function MarqueeText() {
  const reduceMotion = useReducedMotion()

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
            <div className="relative mr-3 h-6 w-6">
              <MocktailIllustration name={mocktail.name} />
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
