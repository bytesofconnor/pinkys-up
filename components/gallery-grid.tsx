'use client';

import Image from "next/image"
import { motion } from "framer-motion"
import { galleryImages } from "@/lib/gallery"

export default function GalleryGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
    >
      {galleryImages.map((image, index) => (
        <motion.figure
          key={image.src}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.5 }}
          className={`group relative overflow-hidden rounded-[28px] ${
            index === 0 ? "md:col-span-2 md:aspect-[16/10]" : "aspect-[3/4]"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={index === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 50vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100">
            <figcaption className="absolute bottom-5 left-5 font-display text-2xl text-white">
              {image.title}
            </figcaption>
          </div>
        </motion.figure>
      ))}
    </motion.div>
  )
}
