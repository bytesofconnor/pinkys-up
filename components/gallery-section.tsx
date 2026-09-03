'use client';

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from "react"
import { SectionHeading } from "@/components/section-heading"
import { galleryImages } from "@/lib/gallery"

export function GallerySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-24" id="gallery">
      <div className="container">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl sm:text-left">
            <SectionHeading
              align="left"
              eyebrow="Gallery"
              title="Moments Worth Raising a Glass To."
              description="Mocktails, community, and a little extra sparkle — from DC to Minneapolis."
            />
          </div>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll gallery left"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-gray-900 transition-colors hover:border-[#9d174d] hover:text-[#9d174d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll gallery right"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-gray-900 transition-colors hover:border-[#9d174d] hover:text-[#9d174d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {galleryImages.map((item) => (
            <Link
              key={item.src}
              href="/gallery"
              className="group relative h-[420px] w-[300px] flex-none snap-start overflow-hidden rounded-[28px] sm:w-[320px]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="320px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
                <p className="absolute bottom-5 left-5 font-display text-2xl text-white">
                  {item.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
