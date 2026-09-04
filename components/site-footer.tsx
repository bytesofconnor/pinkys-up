'use client';

import Link from "next/link"
import { Instagram } from "lucide-react"
import { MarqueeText } from "./marquee-text"
import { MusicPlayer } from "./music-player"
import { TikTokIcon } from "./icons/tiktok"
import { WhatsAppIcon } from "./icons/whatsapp"

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/pinkysup_dc",
    icon: Instagram,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@pinkysup_dc",
    icon: TikTokIcon,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/15715014766",
    icon: WhatsAppIcon,
  },
]

export function SiteFooter() {
  return (
    <footer className="sticky bottom-0 z-40 w-full border-t border-black/10 bg-background safe-bottom">
      <div className="container flex h-16 items-center gap-2 px-4 sm:px-6">
        <MarqueeText />
        <div className="ml-auto flex shrink-0 items-center -mr-2">
          <MusicPlayer />
          {socialLinks.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center text-gray-900 transition-colors hover:text-[#9d174d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">{item.name} (opens in a new tab)</span>
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}
