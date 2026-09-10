'use client';

import React from 'react';
import { CinematicBackdrop } from "@/components/cinematic-backdrop"
import { TrackedLink } from "@/components/tracked-link"

type HeroAction = {
  href: string
  event: string
  label: string
  variant: "primary" | "secondary"
  external?: boolean
}

export function HeroSection({
  imageSrc = "/cover.png",
  objectPosition = "center 48%",
  intensity = "default",
  variant = "card",
  eyebrow = "Washington, DC · Minneapolis",
  title = "Move. Connect. Celebrate.",
  description = "Two ways in: free community gatherings, or book the mocktail cart for your people.",
  minHeightClass = "min-h-screen",
  actions,
}: {
  imageSrc?: string
  objectPosition?: string
  intensity?: "default" | "deep" | "soft" | "light" | "clear"
  variant?: "card" | "editorial"
  eyebrow?: string
  title?: string
  description?: string
  minHeightClass?: string
  actions?: HeroAction[]
}) {
  const links = actions ?? [
    {
      href: "/events",
      event: "explore_events",
      label: "Join a community event",
      variant: "primary" as const,
    },
    {
      href: "/quote?for=mocktails",
      event: "book_quote",
      label: "Book the cart",
      variant: "secondary" as const,
    },
  ]

  const isEditorial = variant === "editorial"

  return (
    <section
      className={`relative -mt-20 flex ${minHeightClass} overflow-hidden ${
        isEditorial ? "items-end" : "items-center justify-center"
      }`}
    >
      <CinematicBackdrop
        imageSrc={imageSrc}
        alt=""
        intensity={intensity}
        objectPosition={objectPosition}
      />

      <div
        className={
          isEditorial
            ? "relative z-10 w-full px-5 pb-24 pt-28 sm:px-10 sm:pb-28 md:px-16"
            : "relative z-10 container mx-auto px-4 sm:px-6 py-24 sm:py-32"
        }
      >
        <div
          className={
            isEditorial
              ? "max-w-xl text-left"
              : "mx-auto max-w-3xl px-5 py-8 text-center sm:px-10 sm:py-12"
          }
        >
          <p
            className={`mb-3 text-xs uppercase tracking-[0.35em] text-white/90 ${isEditorial ? "mb-2 sm:mb-3" : "mb-4 [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]"}`}
          >
            {eyebrow}
          </p>
          <h1
            className={`font-display font-semibold leading-[1.15] tracking-tight text-[#ffd0e4] ${
              isEditorial
                ? "text-4xl sm:text-5xl md:text-6xl"
                : "text-3xl sm:text-5xl md:text-6xl [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]"
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-3 max-w-md text-sm tracking-[0.04em] text-white/95 sm:mt-4 sm:text-base md:text-lg ${
              isEditorial ? "" : "mx-auto mt-4 sm:mt-5 max-w-xl [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]"
            }`}
          >
            {description}
          </p>
          <div
            className={
              isEditorial
                ? "mt-5 flex flex-col items-start gap-3 sm:mt-7 sm:flex-row"
                : "mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4"
            }
          >
            {links.map((action) => (
              <TrackedLink
                key={action.label}
                href={action.href}
                event={action.event}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className={
                  action.variant === "primary"
                    ? `inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#9d174d] px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${isEditorial ? "" : "w-full sm:w-auto"}`
                    : `inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/70 bg-black/25 px-7 py-3.5 text-sm font-medium tracking-wide text-white backdrop-blur-[2px] transition-colors hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${isEditorial ? "" : "w-full sm:w-auto"}`
                }
              >
                {action.label}
                {action.external ? (
                  <span className="sr-only"> (opens in a new tab)</span>
                ) : null}
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
