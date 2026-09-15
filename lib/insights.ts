import { fetchQuery } from "convex/nextjs"
import { api } from "@/convex/_generated/api"
import { convexConfigured, getAdminToken } from "@/lib/convex"

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

export async function getSiteInsights() {
  if (!convexConfigured()) return null

  return await fetchQuery(api.analytics.summary, {
    adminToken: getAdminToken(),
    since: Date.now() - THIRTY_DAYS_MS,
  })
}
