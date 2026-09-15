import Link from "next/link"
import { logoutAdmin } from "@/app/admin/actions"

export function AdminNav({ current }: { current: "insights" | "events" | "quotes" }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-pink-600">PINKYS UP</p>
        <h1 className="mt-1 font-display text-3xl text-gray-900">
          {current === "insights" ? "Insights" : current === "events" ? "Events" : "Quote requests"}
        </h1>
      </div>
      <nav className="flex flex-wrap items-center gap-3 text-sm">
        <Link
          href="/admin/insights"
          className={current === "insights" ? "font-semibold text-[#9d174d]" : "text-gray-600 hover:text-gray-900"}
        >
          Insights
        </Link>
        <Link
          href="/admin/events"
          className={current === "events" ? "font-semibold text-[#9d174d]" : "text-gray-600 hover:text-gray-900"}
        >
          Events
        </Link>
        <Link
          href="/admin/quotes"
          className={current === "quotes" ? "font-semibold text-[#9d174d]" : "text-gray-600 hover:text-gray-900"}
        >
          Quotes
        </Link>
        <form action={logoutAdmin}>
          <button type="submit" className="text-gray-500 hover:text-gray-900">
            Log out
          </button>
        </form>
      </nav>
    </div>
  )
}
