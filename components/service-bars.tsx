'use client';

import React from 'react';
import Image from "next/image"
import Link from "next/link"
import { motion } from 'framer-motion';

export function ServiceBars() {
  return (
    <section className="py-20" id="bars">
      <div className="container mx-auto px-4">
        <p className="mb-3 text-center text-sm uppercase tracking-[0.3em] text-pink-600">
          Book the Cart
        </p>
        <h2 className="mb-8 text-center font-display text-4xl leading-tight text-gray-900">
          A Mocktail Experience for Your People
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative group mx-auto max-w-7xl"
        >
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-pink-400/20 to-purple-400/20 blur-xl transition-all duration-300 group-hover:blur-2xl" />
          <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/30 p-8 backdrop-blur-md">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 blur-md opacity-55 transition-all duration-500 group-hover:opacity-90 group-hover:blur-lg" />
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src="/cart.jpg"
                      alt="Pinky's Up mobile mocktail cart"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full space-y-6 md:w-1/2">
                <h3 className="font-display text-3xl leading-tight text-gray-900">The Mobile Mocktail Cart</h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  Vintage-inspired service for private gatherings, celebrations, and branded events.
                  We bring the cart, the menu, and the hospitality.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="mr-2" aria-hidden="true">✦</span>
                    Handcrafted non-alcoholic cocktails
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2" aria-hidden="true">✦</span>
                    Professional service staff
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2" aria-hidden="true">✦</span>
                    Custom menu creation
                  </li>
                </ul>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Link
                    href="/quote"
                    className="inline-flex min-h-11 items-center justify-center bg-[#9d174d] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#831843] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
                  >
                    Request a quote
                  </Link>
                  <Link
                    href="/mocktails"
                    className="inline-flex min-h-11 items-center justify-center border border-gray-900 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-gray-900 transition-colors hover:bg-gray-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
                  >
                    See the menu
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
