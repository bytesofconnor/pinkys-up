'use client'

import * as React from "react"
import Link from "next/link"
import { motion as m } from "framer-motion"
import { HeroSection } from "@/components/hero-section"
import { MocktailIllustration } from "@/components/mocktail-illustration"
import { SectionHeading } from "@/components/section-heading"
import { TrackedLink } from "@/components/tracked-link"
import { FALL_MENU, fallQuoteHref } from "@/lib/fall-menu"
import { mocktails } from "@/lib/mocktails"
import { contactHref, link } from "@/lib/destinations"

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-pink-50 to-purple-50">
      <HeroSection
        imageSrc="/pinkies.png"
        objectPosition="64% 42%"
        intensity="clear"
        align="left"
        soften="barely"
        title="Mindfully Crafted Elixirs"
        description="Zero-proof drinks for Washington, DC and Minneapolis, built for the cart."
        actions={[
          {
            href: contactHref("mocktails"),
            event: "book_quote",
            label: "Book this menu",
            variant: "primary",
          },
        ]}
      />
      <section className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6 sm:pt-20">
        <p className="text-sm uppercase tracking-[0.3em] text-pink-600">
          Washington, DC · Minneapolis
        </p>
        <h2 className="mt-3 font-display text-4xl leading-tight text-gray-900">
          The Mobile Mocktail Cart
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-gray-700">
          Vintage-inspired, fully zero-proof service for weddings, parties, and brand events.
          We bring the cart, the menu, and the hospitality. There is no alcohol.
        </p>
        <p className="mt-4 text-base leading-relaxed text-gray-700">
          Minneapolis and the Twin Cities get the same cart as Washington, DC.
          The menu is Blush Hour, Plus One, and Mirrorball, with a custom menu when the event needs one.
          Community gatherings stay free, and a date shows up on{" "}
          <Link href={link("events").path} className="font-medium text-[#9d174d] underline-offset-4 hover:underline">
            Community Events
          </Link>{" "}
          only when it is really booked.
        </p>
      </section>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-20 pt-12 sm:pt-16 md:pt-24">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {mocktails.map((mocktail, index) => (
            <m.div
              key={mocktail.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative overflow-visible"
            >
              <div
                className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 sm:rounded-[32px]"
                style={{ background: mocktail.glow }}
              />
              <div className="relative rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur-md sm:rounded-[32px] sm:p-8">
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div className="relative aspect-square w-full">
                    <div
                      className="pointer-events-none absolute -inset-4 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: mocktail.glow }}
                    />
                    <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/30 bg-white/20">
                      <div className="flex h-full w-full items-center justify-center p-3 transition-transform duration-700 group-hover:scale-105 sm:p-4">
                        <MocktailIllustration name={mocktail.name} instanceId={mocktail.name} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="mb-1.5 sm:mb-2 text-xs uppercase tracking-[0.24em] text-pink-600">
                        {mocktail.season}
                      </p>
                      <h2 className="font-display text-2xl sm:text-3xl text-gray-900">
                        {mocktail.name}
                      </h2>
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
        <section className="mt-16 sm:mt-24">
          <SectionHeading
            as="h2"
            align="left"
            eyebrow="Minnesota fall"
            title="Seasonal drafts"
            description={`${FALL_MENU.length} drinks in progress for fall. Names may still change. Ask for the one you want on the cart.`}
          />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            {FALL_MENU.map((drink, index) => (
              <m.div
                key={drink.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="rounded-2xl border border-white/20 bg-white/30 p-5 backdrop-blur-md sm:rounded-[32px] sm:p-8"
              >
                <p className="mb-1.5 text-xs uppercase tracking-[0.24em] text-pink-600">
                  Minnesota fall
                </p>
                <h3 className="font-display text-2xl text-gray-900 sm:text-3xl">{drink.name}</h3>
                <p className="mt-3 text-sm text-gray-700 sm:text-base">{drink.description}</p>
                <TrackedLink
                  href={fallQuoteHref(drink)}
                  event="book_quote"
                  className="mt-5 inline-block font-medium text-[#9d174d] underline-offset-4 hover:underline"
                >
                  Ask for {drink.name}
                </TrackedLink>
              </m.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
