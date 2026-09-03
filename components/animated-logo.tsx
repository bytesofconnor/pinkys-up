'use client'

import Image from "next/image"
import { motion } from "framer-motion"

export function AnimatedLogo() {
  return (
    <>
      <motion.div
        className="p-1 md:hidden"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src="/disco-mocktail.svg"
          alt=""
          width={48}
          height={48}
          className="h-12 w-12"
        />
      </motion.div>

      <motion.div
        className="hidden items-center gap-3 font-display text-3xl tracking-wide text-gray-900 md:flex"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
      >
        <Image
          src="/disco-mocktail.svg"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 shrink-0"
        />
        <span>PINKYS UP</span>
      </motion.div>
    </>
  )
}
