"use client"

import { removeEvent } from "@/app/admin/actions"

export function DeleteEventButton({ id }: { id: string }) {
  return (
    <form
      action={removeEvent}
      onSubmit={(event) => {
        if (!confirm("Delete this event from the website?")) {
          event.preventDefault()
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-red-700 hover:bg-red-50"
      >
        Delete
      </button>
    </form>
  )
}
