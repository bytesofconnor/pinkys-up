import { notFound, redirect } from "next/navigation"
import { AdminNav } from "@/app/admin/admin-nav"
import { EventForm } from "@/app/admin/event-form"
import { isAdmin } from "@/lib/admin"
import { getEventById } from "@/lib/events-db"

export const dynamic = "force-dynamic"

export default async function EditEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ token?: string }>
}) {
  const [{ id }, query] = await Promise.all([params, searchParams])
  if (!(await isAdmin(query.token))) {
    redirect("/admin")
  }

  const event = await getEventById(id)
  if (!event) notFound()

  return (
    <div className="min-h-screen bg-pink-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <AdminNav current="events" />
        <h2 className="mb-5 font-display text-2xl text-gray-900">Edit event</h2>
        <EventForm event={event} />
      </div>
    </div>
  )
}
