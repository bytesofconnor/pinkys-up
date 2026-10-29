"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { directoryLinks } from "@/lib/destinations"

export function SiteDirectory() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  return (
    <nav aria-label="Site" className="border-t border-black/10 bg-pink-50/90">
      <ul className="container flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-4 text-sm text-gray-600 sm:px-6">
        {directoryLinks.map((item) => (
          <li key={item.id}>
            <Link href={item.path} className="hover:text-[#9d174d]">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
