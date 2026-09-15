"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackSiteEvent } from "@/lib/site-analytics"

export function PageView() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return
    trackSiteEvent("page_view", pathname)
  }, [pathname])

  return null
}
