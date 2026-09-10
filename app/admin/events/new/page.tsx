import { redirect } from "next/navigation"
import { AdminNav } from "@/app/admin/admin-nav"
import { EventForm } from "@/app/admin/event-form"
import { isAdmin } from "@/lib/admin"

export const dynamic = "force-dynamic"

export default async function NewEventPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  if (!(await isAdmin(params.token))) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen bg-pink-50 py-8">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <AdminNav current="events" />
        <h2 className="mb-5 font-display text-2xl text-gray-900">New event</h2>
        <EventForm />
      </div>
    </div>
  )
}
