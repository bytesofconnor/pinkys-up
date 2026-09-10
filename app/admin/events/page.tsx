import Link from "next/link"
import { redirect } from "next/navigation"
import { AdminNav } from "@/app/admin/admin-nav"
import { DeleteEventButton } from "@/app/admin/delete-event-button"
import { isAdmin } from "@/lib/admin"
import { eventsDatabaseConfigured, listAllEvents } from "@/lib/events-db"
import { formatEventDate, formatEventTime } from "@/lib/events"

export const dynamic = "force-dynamic"

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  if (!(await isAdmin(params.token))) {
    redirect("/admin")
  }

  let events: Awaited<ReturnType<typeof listAllEvents>> = []
  let loadError: string | null = null

  if (!eventsDatabaseConfigured()) {
    loadError = "Supabase is not configured on this environment yet."
  } else {
    try {
      events = await listAllEvents()
    } catch {
      loadError = "The events table is missing. Run the SQL in database/events.sql in Supabase, then refresh."
    }
  }

  const sorted = [...events].sort((a, b) => {
    if (!a.startsAt) return 1
    if (!b.startsAt) return -1
    return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
  })

  return (
    <div className="min-h-screen bg-pink-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <AdminNav current="events" />

        {loadError ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            {loadError}
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {sorted.length === 0 ? "No events yet." : `${sorted.length} event${sorted.length === 1 ? "" : "s"}`}
              </p>
              <Link
                href="/admin/events/new"
                className="inline-flex min-h-11 items-center rounded-full bg-[#9d174d] px-5 text-sm font-medium text-white hover:bg-[#831843]"
              >
                Add event
              </Link>
            </div>

            {sorted.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-pink-200 bg-white p-8 text-center text-gray-600">
                Add the first gathering and it will show up on the homepage and Events page.
              </div>
            ) : (
              <div className="space-y-3">
                {sorted.map((event) => (
                  <article key={event.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-pink-600">
                          {event.startsAt
                            ? `${formatEventDate(event.startsAt, event.timeZone)} · ${formatEventTime(event.startsAt, event.timeZone)}`
                            : "Date TBD"}
                        </p>
                        <h2 className="mt-1 font-display text-2xl text-gray-900">{event.name}</h2>
                        <p className="mt-1 text-sm text-gray-600">{event.location}</p>
                        {!event.published ? (
                          <p className="mt-2 text-xs font-medium text-amber-700">Hidden from the website</p>
                        ) : null}
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/events/${event.id}`}
                          className="inline-flex min-h-11 items-center rounded-full border border-gray-900 px-4 text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white"
                        >
                          Edit
                        </Link>
                        <DeleteEventButton id={event.id} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
