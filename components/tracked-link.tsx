'use client'

import Link from "next/link"
import { track } from "@vercel/analytics"
import type { ComponentProps } from "react"
import { isSiteEventName, trackSiteEvent } from "@/lib/site-analytics"

export function TrackedLink({
  event,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { event: string }) {
  return (
    <Link
      {...props}
      onClick={(clickEvent) => {
        track(event)
        if (isSiteEventName(event)) {
          const href = typeof props.href === "string" ? props.href.split("?")[0] : undefined
          trackSiteEvent(event, href)
        }
        onClick?.(clickEvent)
      }}
    />
  )
}
