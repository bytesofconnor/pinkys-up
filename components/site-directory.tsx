"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/faq", label: "FAQ" },
  { href: "/washington-dc", label: "Washington, DC" },
  { href: "/minneapolis", label: "Minneapolis" },
  { href: "/mocktails", label: "Menu" },
  { href: "/events", label: "Events" },
  { href: "/quote", label: "Quote" },
]

export function SiteDirectory() {
  const pathname = usePathname()
  if (pathname.startsWith("/admin")) return null

  return (
    <nav aria-label="Site" className="border-t border-black/10 bg-pink-50/90">
      <ul className="container flex flex-wrap items-center justify-center gap-x-5 gap-y-2 px-4 py-4 text-sm text-gray-600 sm:px-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-[#9d174d]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
