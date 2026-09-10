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
          duration: reduceMotion ? 0 : 80,
          repeat: reduceMotion ? 0 : Infinity,
          ease: "linear",
        }}
        className="inline-block whitespace-nowrap"
      >
        {duplicatedMocktails.map((mocktail, index) => (
          <span
            key={index}
            className="mx-10 inline-flex items-center group"
          >
            <div className="relative mr-2.5 h-11 w-[2.05rem] shrink-0 sm:h-12 sm:w-9">
              <MocktailIllustration name={mocktail.name} />
            </div>
            <span className={cn(
              "bg-gradient-to-r bg-clip-text text-xs font-medium leading-none text-transparent sm:text-sm",
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
