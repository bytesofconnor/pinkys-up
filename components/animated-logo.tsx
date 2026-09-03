'use client'

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"

const iconTransition = { duration: 0.8, type: "spring" as const, stiffness: 60 }

export function AnimatedLogo() {
  const reduceMotion = useReducedMotion()
  const iconHover = reduceMotion ? undefined : { rotate: 360 }
  const wordHover = reduceMotion
    ? undefined
    : { rotate: 8, scale: 1.06, transition: { type: "spring" as const, stiffness: 300 } }

  return (
    <>
      <motion.div
        className="p-1 md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          whileHover={iconHover}
          whileTap={reduceMotion ? undefined : { scale: 0.94 }}
          transition={iconTransition}
        >
          <Image
            src="/disco-mocktail.svg"
            alt=""
            width={48}
            height={48}
            className="h-12 w-12"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="hidden items-center gap-3 font-display text-3xl tracking-wide text-gray-900 md:flex"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
      >
        <motion.div
          className="shrink-0"
          whileHover={iconHover}
          transition={iconTransition}
        >
          <Image
            src="/disco-mocktail.svg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
          />
        </motion.div>
        <div className="flex items-center">
          <motion.span className="inline-block" whileHover={wordHover}>
            PINKYS
          </motion.span>
          <motion.span className="inline-block pl-2" whileHover={wordHover}>
            UP
          </motion.span>
        </div>
      </motion.div>
    </>
  )
}
