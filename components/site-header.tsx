'use client'

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { AnimatedLogo } from "./animated-logo"

const navItems = [
  { name: "Events", href: "/events" },
  { name: "Mocktails", href: "/mocktails" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Quote", href: "/quote" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- closing menu on navigation is intentional
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) {
      return
    }

    const previouslyFocused = document.activeElement
    firstLinkRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus()
      }
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-background/95 backdrop-blur-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#9d174d]"
      >
        Skip to content
      </a>
      <div className="container flex h-20 items-center justify-between gap-3">
        <Link
          href="/"
          className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
          aria-label="Pinky's Up home"
        >
          <AnimatedLogo />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center justify-end gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center px-3 text-sm uppercase tracking-wide text-gray-900 transition-colors hover:text-[#9d174d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-gray-900 md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open ? (
        <nav
          id={menuId}
          aria-label="Primary"
          className="border-t border-black/10 bg-background md:hidden"
        >
          <ul className="container flex flex-col py-2">
            {navItems.map((item, index) => (
              <li key={item.name}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  className="flex min-h-12 items-center border-b border-black/5 text-base font-medium uppercase tracking-wide text-gray-900 last:border-b-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#9d174d]"
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
