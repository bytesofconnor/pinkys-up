'use client';

import React from 'react';
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export function FounderSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/30 to-purple-400/30 blur-xl rounded-full group-hover:blur-2xl transition-all duration-500" />
            <div className="relative backdrop-blur-md bg-white/30 p-8 rounded-[32px] border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <Link 
                  href="https://www.instagram.com/stories/brendaaa_pereira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
                >
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative h-48 w-48 md:h-64 md:w-64">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 blur-md opacity-55 transition-all duration-500 group-hover:opacity-90 group-hover:blur-lg" />
                      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/30">
                        <Image
                          src="/brendap.jpg"
                          alt="Brenda Pereira Vargas, founder of Pinky's Up"
                          fill
                          className="origin-[50%_45%] scale-[1.28] object-cover object-[48%_64%] transition-transform duration-700 group-hover:scale-[1.34]"
                        />
                      </div>
                    </div>
                  </motion.div>
                </Link>
                <div className="flex-1 text-center md:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h2 className="mb-4 font-display text-3xl text-gray-900 md:text-4xl">
                      Elevating Moments by Brenda
                    </h2>
                    <p className="text-lg text-gray-600 mb-6">
                      Hey there! I&apos;m Brenda, the founder of PINKYS UP DC. My journey into the world of mocktails began with a simple
                      realization - everyone deserves to feel included and celebrated, regardless of their relationship with alcohol.
                    </p>
                    <p className="text-lg text-gray-600">
                      Today, I&apos;m proud to bring DC&apos;s most sophisticated non-alcoholic beverage experience to your events. 
                      Let&apos;s create unforgettable moments together! 🌟
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
