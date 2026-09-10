'use client'

import Link from "next/link"
import { track } from "@vercel/analytics"
import type { ComponentProps } from "react"

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
        onClick?.(clickEvent)
      }}
    />
  )
}
