'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { track } from "@vercel/analytics"
import type { ComponentProps } from "react"
import { isSiteEventName, trackSiteEvent } from "@/lib/site-analytics"

export function TrackedLink({
  event,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { event: string }) {
  const pathname = usePathname()
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        track(event)
        if (isSiteEventName(event)) {
          const href = props.href
          const path =
            typeof href === "string" && href.startsWith("/") ? href.split("?")[0] : pathname
          trackSiteEvent(event, path)
        }
        onClick?.(clickEvent)
      }}
    />
  )
}
