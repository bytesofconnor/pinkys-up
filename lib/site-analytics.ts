"use client"

import { ConvexHttpClient } from "convex/browser"
import { api } from "@/convex/_generated/api"

const SESSION_KEY = "pinkys_session"

type SiteEventName =
  | "page_view"
  | "book_quote"
  | "see_menu"
  | "see_all_events"
  | "book_one_on_one"
  | "explore_events"

let client: ConvexHttpClient | null | undefined

function getClient() {
  if (client !== undefined) return client
  const url = process.env.NEXT_PUBLIC_CONVEX_URL
  client = url ? new ConvexHttpClient(url) : null
  return client
}

function getSessionId() {
  try {
    let sessionId = localStorage.getItem(SESSION_KEY)
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      localStorage.setItem(SESSION_KEY, sessionId)
    }
    return sessionId
  } catch {
    return undefined
  }
}

export function trackSiteEvent(name: SiteEventName, path?: string) {
  const convex = getClient()
  if (!convex) return

  void convex
    .mutation(api.analytics.track, {
      name,
      path,
      sessionId: getSessionId(),
    })
    .catch(() => {})
}

export function isSiteEventName(value: string): value is SiteEventName {
  return (
    value === "page_view" ||
    value === "book_quote" ||
    value === "see_menu" ||
    value === "see_all_events" ||
    value === "book_one_on_one" ||
    value === "explore_events"
  )
}
