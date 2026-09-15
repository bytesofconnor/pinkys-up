import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { requireAdminToken } from "./lib/admin"

const eventNameValidator = v.union(
  v.literal("page_view"),
  v.literal("book_quote"),
  v.literal("see_menu"),
  v.literal("see_all_events"),
  v.literal("book_one_on_one"),
  v.literal("explore_events")
)

const MAX_EVENTS = 3000

function sanitizePath(path: string | undefined) {
  if (!path) return undefined
  const cleaned = path.trim().split("?")[0]?.split("#")[0] ?? ""
  if (!cleaned.startsWith("/")) return undefined
  if (cleaned.startsWith("/admin")) return undefined
  return cleaned.slice(0, 120)
}

function sanitizeSessionId(sessionId: string | undefined) {
  if (!sessionId) return undefined
  const cleaned = sessionId.trim().slice(0, 80)
  return /^[a-zA-Z0-9-]+$/.test(cleaned) ? cleaned : undefined
}

export const track = mutation({
  args: {
    name: eventNameValidator,
    path: v.optional(v.string()),
    sessionId: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const path = sanitizePath(args.path)
    if (args.name === "page_view" && !path) {
      return null
    }

    await ctx.db.insert("siteEvents", {
      name: args.name,
      path,
      sessionId: sanitizeSessionId(args.sessionId),
    })
    return null
  },
})

export const summary = query({
  args: {
    adminToken: v.string(),
    since: v.number(),
  },
  returns: v.object({
    pageViews: v.number(),
    uniqueVisitors: v.number(),
    quotes: v.number(),
    quotesEmailed: v.number(),
    clicks: v.array(
      v.object({
        name: v.string(),
        count: v.number(),
      })
    ),
    topPages: v.array(
      v.object({
        path: v.string(),
        views: v.number(),
      })
    ),
  }),
  handler: async (ctx, args) => {
    requireAdminToken(args.adminToken)

    const events = await ctx.db.query("siteEvents").order("desc").take(MAX_EVENTS)
    const recent = events.filter((event) => event._creationTime >= args.since)

    const pageViews = recent.filter((event) => event.name === "page_view")
    const sessions = new Set(
      pageViews
        .map((event) => event.sessionId)
        .filter((sessionId): sessionId is string => Boolean(sessionId))
    )

    const clickNames = [
      "book_quote",
      "see_menu",
      "see_all_events",
      "book_one_on_one",
      "explore_events",
    ] as const
    const clicks = clickNames.map((name) => ({
      name,
      count: recent.filter((event) => event.name === name).length,
    }))

    const pages = new Map<string, number>()
    for (const event of pageViews) {
      if (!event.path) continue
      pages.set(event.path, (pages.get(event.path) ?? 0) + 1)
    }
    const topPages = [...pages.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([path, views]) => ({ path, views }))

    const quotes = (await ctx.db.query("quoteSubmissions").order("desc").take(500)).filter(
      (quote) => quote._creationTime >= args.since
    )

    return {
      pageViews: pageViews.length,
      uniqueVisitors: sessions.size,
      quotes: quotes.length,
      quotesEmailed: quotes.filter((quote) => quote.emailSent).length,
      clicks,
      topPages,
    }
  },
})
