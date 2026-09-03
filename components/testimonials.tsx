'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"

const testimonials = [
  {
    content: "Watching Brenda create these drinks, you see her vision for what DC's been missing – a space where wellness meets celebration. She's bringing something real and needed to the city, and it's amazing to watch it unfold.",
    author: "Connor Barrett",
    role: "Software Engineer",
    image: "/me.jpeg"
  },
  {
    content: "PINKYS UP is exactly what the DMV needs right now. Their mocktails are incredible, and the way they're reimagining social gatherings is truly inspiring. Can't wait to see this vision spread across the city.",
    author: "Rosa Fernandez",
    role: "Supply Chain Manager",
    image: "/rose.jpeg"
  },
  {
    content: "The attention to detail in both presentation and taste was exceptional. PINKYS UP brought such elegance to our event, making everyone feel included in the celebration. A refreshing addition to DC's scene.",
    author: "Cody",
    role: "Civil Engineer",
    image: "/cody.jpeg"
  }
]

export function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <SectionHeading
            title="What People Are Saying"
            description="Creating memorable experiences through exceptional service and innovative mocktails."
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex h-full flex-col border-t border-black/10 pt-8"
            >
              <p className="font-display text-xl leading-relaxed text-gray-800">
                {testimonial.content}
              </p>
              <div className="mt-8 flex items-center">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
