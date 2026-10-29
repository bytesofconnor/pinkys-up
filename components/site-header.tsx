'use client'

import { useEffect, useId, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { headerContact, headerTabs, link } from "@/lib/destinations"
import { AnimatedLogo } from "./animated-logo"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [menuPathname, setMenuPathname] = useState(pathname)
  const menuId = useId()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  if (menuPathname !== pathname) {
    setMenuPathname(pathname)
    setOpen(false)
  }

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-background safe-top">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:bg-white focus:px-4 focus:py-2 focus:text-gray-900 focus:outline-solid focus:outline-2 focus:outline-offset-2 focus:outline-[#9d174d]"
      >
        Skip to content
      </a>
      <div className="container flex h-20 items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={link("home").path}
          className="shrink-0 rounded-xs focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9d174d]"
          aria-label="Pinky's Up home"
        >
          <AnimatedLogo />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center justify-end gap-1">
              {headerTabs.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.path}
                    className="inline-flex min-h-11 items-center px-3 text-sm uppercase tracking-wide text-gray-900 transition-colors hover:text-[#9d174d] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
                    aria-current={pathname === item.path ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={headerContact.path}
            className="inline-flex min-h-11 items-center bg-[#9d174d] px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#831843] focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
            aria-current={pathname === headerContact.path ? "page" : undefined}
          >
            {headerContact.label}
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center text-gray-900 md:hidden focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/10 bg-background md:hidden">
          <nav id={menuId} aria-label="Primary">
            <ul className="container flex flex-col py-2">
              {headerTabs.map((item, index) => (
                <li key={item.id}>
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={item.path}
                    className="flex min-h-12 items-center border-b border-black/5 text-base font-medium uppercase tracking-wide text-gray-900 focus-visible:outline-solid focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#9d174d]"
                    aria-current={pathname === item.path ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="container pb-4">
            <Link
              href={headerContact.path}
              className="flex min-h-12 items-center justify-center bg-[#9d174d] px-4 text-sm font-semibold uppercase tracking-[0.16em] text-white focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9d174d]"
              aria-current={pathname === headerContact.path ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {headerContact.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}
