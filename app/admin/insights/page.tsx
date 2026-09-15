import { redirect } from "next/navigation"
import { AdminNav } from "@/app/admin/admin-nav"
import { AdminHelp } from "@/app/admin/admin-help"
import { isAdmin } from "@/lib/admin"
import { convexConfigured } from "@/lib/convex"
import { getSiteInsights } from "@/lib/insights"

export const dynamic = "force-dynamic"

const CLICK_LABELS: Record<string, string> = {
  book_quote: "Book the cart / request a quote",
  see_menu: "See the mocktail menu",
  see_all_events: "See all events",
  book_one_on_one: "Book a 1:1",
  explore_events: "Join a community event",
}

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/events": "Events",
  "/mocktails": "Mocktails",
  "/quote": "Quote",
  "/1-1": "1:1 sessions",
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-pink-600">{label}</p>
      <p className="mt-2 font-display text-4xl text-gray-900">{value}</p>
      {hint ? <p className="mt-2 text-sm text-gray-600">{hint}</p> : null}
    </div>
  )
}

export default async function AdminInsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  if (!(await isAdmin(params.token))) {
    redirect("/admin")
  }

  let loadError: string | null = null
  let insights: Awaited<ReturnType<typeof getSiteInsights>> = null

  if (!convexConfigured()) {
    loadError = "Convex is not configured on this environment yet."
  } else {
    try {
      insights = await getSiteInsights()
    } catch {
      loadError = "Could not load insights. Check ADMIN_TOKEN on both Vercel and the Convex dashboard."
    }
  }

  return (
    <div className="min-h-screen bg-pink-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <AdminNav current="insights" />
        <AdminHelp current="insights" />

        {loadError || !insights ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            {loadError ?? "No insights yet."}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard
                label="People"
                value={insights.uniqueVisitors.toLocaleString()}
                hint="Unique browsers in the last 30 days"
              />
              <StatCard
                label="Page views"
                value={insights.pageViews.toLocaleString()}
                hint="Times someone opened a public page"
              />
              <StatCard
                label="Quote requests"
                value={insights.quotes.toLocaleString()}
                hint={
                  insights.quotes === 0
                    ? "From the public quote form"
                    : `${insights.quotesEmailed} also emailed to the inbox`
                }
              />
              <StatCard
                label="Quote clicks"
                value={(insights.clicks.find((click) => click.name === "book_quote")?.count ?? 0).toLocaleString()}
                hint="Taps on Book the cart / Request a quote"
              />
            </div>

            <section className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="font-display text-2xl text-gray-900">What people tap</h2>
              <ul className="mt-4 space-y-3">
                {insights.clicks.map((click) => (
                  <li key={click.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">{CLICK_LABELS[click.name] ?? click.name}</span>
                    <span className="font-medium text-gray-900">{click.count}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5">
              <h2 className="font-display text-2xl text-gray-900">Pages</h2>
              {insights.topPages.length === 0 ? (
                <p className="mt-3 text-sm text-gray-600">
                  No public page views yet. Numbers start after this page is live.
                </p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {insights.topPages.map((page) => (
                    <li key={page.path} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{PAGE_LABELS[page.path] ?? page.path}</span>
                      <span className="font-medium text-gray-900">{page.views}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
