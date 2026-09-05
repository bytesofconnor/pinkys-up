'use client';

import Link from "next/link"
import { motion } from "framer-motion"
import React from 'react';
import { CinematicBackdrop } from "@/components/cinematic-backdrop"
import { getNextRegisterableEvent } from "@/lib/events"

export function HeroSection() {
  const nextRegisterableEvent = getNextRegisterableEvent()
  const exploreHref = nextRegisterableEvent?.registrationUrl ?? "/events"

  return (
    <section className="relative -mt-20 flex min-h-screen items-center justify-center overflow-hidden">
      <CinematicBackdrop
        imageSrc="/polaroid.jpg"
        alt=""
        intensity="light"
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl rounded-2xl sm:rounded-3xl border border-white/20 bg-black/32 px-5 py-8 sm:px-10 sm:py-12 text-center shadow-xl backdrop-blur-md"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mb-4 text-xs uppercase tracking-[0.35em] text-white/90"
          >
            Washington, DC · Minneapolis
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="font-display text-3xl font-semibold leading-[1.2] tracking-tight text-[#ffd0e4] sm:text-5xl md:text-6xl"
          >
            Move. Connect. Celebrate.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-4 sm:mt-5 max-w-xl text-sm sm:text-base tracking-[0.04em] text-white sm:text-lg"
          >
            Wellness, community, and zero-proof celebration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3 sm:gap-4 sm:flex-row"
          >
            <Link
              href={exploreHref}
              target={nextRegisterableEvent?.registrationUrl ? "_blank" : undefined}
              rel={nextRegisterableEvent?.registrationUrl ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-[#9d174d] px-6 sm:px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              Explore upcoming events
              {nextRegisterableEvent?.registrationUrl ? (
                <span className="sr-only"> (opens in a new tab)</span>
              ) : null}
            </Link>
            <Link
              href="/quote"
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-white/60 bg-white/10 px-6 sm:px-8 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto"
            >
              Book a mocktail experience
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
