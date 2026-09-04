'use client'

import * as React from "react"
import { motion as m } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
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

interface CartPackage {
  name: string;
  guestCount: string;
  description: string;
  features: string[];
  themeClass: string;
  popular?: boolean;
}

const cartPackages: CartPackage[] = [
  {
    name: "Intimate Gathering",
    guestCount: "10-25 Guests",
    description: "Perfect for private gatherings, small celebrations, and close-knit events where every detail matters.",
    features: [
      "2 signature mocktails",
      "Professional bartender (2 hours)",
      "Vintage-inspired cart setup",
      "Custom menu design",
      "Glassware & garnishes included"
    ],
    themeClass: "from-pink-400/30 to-rose-400/30",
  },
  {
    name: "Classic Experience",
    guestCount: "25-50 Guests",
    description: "Our most popular package for celebrations, corporate events, and gatherings that deserve something special.",
    features: [
      "3-4 signature mocktails",
      "Professional bartender (3 hours)",
      "Premium cart styling",
      "Custom menu design",
      "Glassware & garnishes included",
      "Welcome signage"
    ],
    themeClass: "from-purple-400/30 to-pink-400/30",
    popular: true,
  },
  {
    name: "Grand Celebration",
    guestCount: "50+ Guests",
    description: "Elevated service for large-scale events, brand activations, and occasions that call for the full experience.",
    features: [
      "4+ signature mocktails",
      "Multiple bartenders (4+ hours)",
      "Premium cart styling",
      "Fully customized menu",
      "Glassware & garnishes included",
      "Welcome signage & table settings",
      "Seasonal décor options"
    ],
    themeClass: "from-indigo-400/30 to-purple-400/30",
  }
];

const benefits = [
  {
    title: "Zero-Proof, Full Experience",
    description: "Sophisticated mocktails that celebrate wellness without compromise."
  },
  {
    title: "Turnkey Service",
    description: "We bring the cart, the drinks, the glassware, and the hospitality."
  },
  {
    title: "Customized Menus",
    description: "Seasonal ingredients, dietary accommodations, and brand alignment available."
  },
  {
    title: "DC & Minneapolis",
    description: "Serving communities in Washington, DC and Minneapolis with love."
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
          className="text-center mb-12"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-pink-600">
            Mobile Mocktail Cart
          </p>
          <h1 className="mb-6 font-display text-5xl md:text-6xl leading-tight text-gray-900">
            Raise Your Glass,<br />Not Your Proof
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Bring the chicest alcohol-free bar experience to your celebration. Vintage cart, handcrafted mocktails, and professional service for gatherings of all sizes.
          </p>
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              href="/quote"
              className="inline-flex min-h-12 items-center justify-center bg-[#9d174d] px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all hover:bg-[#831843] hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
            >
              Request a Quote
            </Link>
          </m.div>
        </m.div>

        <section className="mb-20 mt-16">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SectionHeading
              as="h2"
              title="Cart Experience Packages"
              description="Choose the right level of service for your gathering. All packages include custom menu design and professional bartending."
            />
          </m.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cartPackages.map((pkg, index) => (
              <m.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 text-xs font-semibold uppercase tracking-wider rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className={cn(
                  "absolute -inset-1 bg-gradient-to-br rounded-[32px] blur opacity-0 group-hover:opacity-75 transition-all duration-500",
                  pkg.themeClass
                )} />
                <div className="relative backdrop-blur-md bg-white/40 p-8 rounded-[32px] border border-white/20 h-full flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-display text-3xl text-gray-900 mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-lg font-semibold text-pink-600">
                      {pkg.guestCount}
                    </p>
                  </div>
                  <p className="text-gray-700 mb-6">
                    {pkg.description}
                  </p>
                  <div className="space-y-3 mb-8 flex-grow">
                    {pkg.features.map((feature) => (
                      <div key={feature} className="flex items-start">
                        <span className="mr-2 mt-1 text-pink-600" aria-hidden="true">✦</span>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/quote"
                    className="inline-flex min-h-11 items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold px-6 text-sm uppercase tracking-wider"
                  >
                    Get a Quote
                  </Link>
                </div>
              </m.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SectionHeading
              as="h2"
              title="Why Choose Pinky's Up?"
            />
          </m.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <m.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-3xl blur opacity-0 group-hover:opacity-75 transition-all duration-500" />
                <div className="relative backdrop-blur-md bg-white/30 p-6 rounded-3xl border border-white/20 text-center">
                  <h3 className="font-display text-xl text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {benefit.description}
                  </p>
                </div>
              </m.div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SectionHeading
              as="h2"
              title="Signature Mocktails"
              description="A selection of our mindfully crafted elixirs. Each package includes a custom menu designed around your event and preferences."
            />
          </m.div>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {mocktails.map((mocktail, index) => (
              <m.div
                key={mocktail.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
        </section>

        <m.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-[32px] blur opacity-75" />
          <div className="relative backdrop-blur-md bg-white/40 p-12 md:p-16 rounded-[32px] border border-white/20 text-center">
            <h2 className="font-display text-4xl md:text-5xl text-gray-900 mb-4">
              Ready to Book the Cart?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Let&apos;s create an unforgettable zero-proof experience for your next gathering. Tell us about your event and we&apos;ll follow up with availability and pricing.
            </p>
            <Link
              href="/quote"
              className="inline-flex min-h-12 items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold px-10 py-4 text-base uppercase tracking-wider"
            >
              Request Your Quote
            </Link>
          </div>
        </m.section>
      </div>
    </div>
  );
}
