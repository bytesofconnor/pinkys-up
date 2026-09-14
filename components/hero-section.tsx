'use client';

import React from 'react';
import { CinematicBackdrop } from "@/components/cinematic-backdrop"
import { TrackedLink } from "@/components/tracked-link"
import { cn } from "@/lib/utils"

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
  align = "center",
  eyebrow = "Washington, DC · Minneapolis",
  title = "Move. Connect. Celebrate.",
  description = "Two ways in: free community gatherings, or book the mocktail cart for your people.",
  soften = "none",
  actions,
  children,
}: {
  imageSrc?: string
  objectPosition?: string
  intensity?: "default" | "deep" | "soft" | "light" | "clear"
  align?: "center" | "left"
  eyebrow?: string
  title?: string
  description?: string
  soften?: "none" | "barely"
  actions?: HeroAction[]
  children?: React.ReactNode
}) {
  const isLeft = align === "left"

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

  return (
    <section className="relative -mt-20 flex min-h-screen items-center overflow-hidden">
      <CinematicBackdrop
        imageSrc={imageSrc}
        alt=""
        intensity={intensity}
        objectPosition={objectPosition}
        soften={soften}
      />

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-4 sm:px-6">
          <div
            className={cn(
              isLeft ? "max-w-2xl text-left" : "mx-auto max-w-3xl text-center"
            )}
          >
            {children ?? (
              <>
                <div className="relative">
                  <p className="absolute bottom-full mb-4 w-full text-xs uppercase tracking-[0.35em] text-white/90 [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]">
                    {eyebrow}
                  </p>
                  <h1 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-[#ffd0e4] sm:text-5xl md:text-6xl [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
                    {title}
                  </h1>
                </div>
                {description ? (
                  <p
                    className={cn(
                      "mt-4 min-h-[3.25rem] text-sm tracking-[0.04em] text-white/95 sm:mt-5 sm:min-h-[3.75rem] sm:text-base md:text-lg [text-shadow:0_2px_24px_rgba(0,0,0,0.7)]",
                      isLeft ? "max-w-md" : "mx-auto max-w-xl"
                    )}
                  >
                    {description}
                  </p>
                ) : null}
                <div
                  className={cn(
                    "mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4",
                    isLeft ? "items-start" : "items-center justify-center"
                  )}
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
                          ? "inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#9d174d] px-7 py-3.5 text-sm font-medium tracking-wide text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                          : "inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/70 bg-black/25 px-7 py-3.5 text-sm font-medium tracking-wide text-white backdrop-blur-[2px] transition-colors hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                      }
                    >
                      {action.label}
                      {action.external ? (
                        <span className="sr-only"> (opens in a new tab)</span>
                      ) : null}
                    </TrackedLink>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
