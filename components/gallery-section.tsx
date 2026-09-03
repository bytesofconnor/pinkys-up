'use client';

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRef } from "react"

export function GallerySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  const gallery = [
    {
      title: "Rooftop Views",
      image: "/drinks.jpg",
    },
    {
      title: "Corporate Wellness",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80",
    },
    {
      title: "Handcrafted Mocktails",
      image: "/2.jpg",
    },
    {
      title: "Capitol Celebrations",
      image: "/3.jpg",
    },
    {
      title: "Team Building",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80",
    },
    {
      title: "Garden Parties",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80",
    },
  ]

  return (
    <section className="py-20 bg-secondary/30" id="gallery">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl text-gray-900 md:text-4xl">Gallery</h2>
          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {gallery.map((item, index) => (
            <Link
              key={index}
              href="/gallery"
              className="relative flex-none w-[300px] h-[400px] overflow-hidden rounded-xl snap-start group"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0">
                <p className="absolute bottom-4 left-4 text-white font-medium text-lg">
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
