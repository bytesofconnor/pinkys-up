"use client"

import { useState } from "react"
import { saveEvent } from "@/app/admin/actions"
import type { WellnessEvent } from "@/lib/events"
import { isoToWallTime } from "@/lib/timezone"

export function EventForm({
  event,
}: {
  event?: WellnessEvent & { published?: boolean }
}) {
  const wall = event?.startsAt ? isoToWallTime(event.startsAt, event.timeZone) : { date: "", time: "" }
  const [dateTbd, setDateTbd] = useState(!event?.startsAt)

  return (
    <form action={saveEvent} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
      {event ? <input type="hidden" name="id" value={event.id} /> : null}

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">Event name</label>
        <input
          id="name"
          name="name"
          required
          maxLength={160}
          defaultValue={event?.name ?? ""}
          className="h-11 w-full rounded-md border border-gray-200 px-3"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          required
          maxLength={500}
          defaultValue={event?.description ?? ""}
          className="min-h-[100px] w-full rounded-md border border-gray-200 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="location" className="mb-1.5 block text-sm font-medium text-gray-700">Location</label>
        <input
          id="location"
          name="location"
          required
          maxLength={200}
          list="locations"
          defaultValue={event?.location ?? ""}
          placeholder="Washington, DC or Minneapolis, MN"
          className="h-11 w-full rounded-md border border-gray-200 px-3"
        />
        <datalist id="locations">
          <option value="Washington, DC" />
          <option value="Minneapolis, MN" />
        </datalist>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="dateTbd"
          checked={dateTbd}
          onChange={(e) => setDateTbd(e.target.checked)}
        />
        Date to be announced
      </label>

      {dateTbd ? null : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label htmlFor="date" className="mb-1.5 block text-sm font-medium text-gray-700">Date</label>
            <input
              id="date"
              name="date"
              type="date"
              required
              defaultValue={wall.date}
              className="h-11 w-full rounded-md border border-gray-200 px-3"
            />
          </div>
          <div>
            <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-gray-700">Time</label>
            <input
              id="time"
              name="time"
              type="time"
              required
              defaultValue={wall.time}
              className="h-11 w-full rounded-md border border-gray-200 px-3"
            />
          </div>
          <div>
            <label htmlFor="timeZone" className="mb-1.5 block text-sm font-medium text-gray-700">Time zone</label>
            <select
              id="timeZone"
              name="timeZone"
              defaultValue={event?.timeZone ?? "America/Chicago"}
              className="h-11 w-full rounded-md border border-gray-200 px-3"
            >
              <option value="America/New_York">Eastern</option>
              <option value="America/Chicago">Central</option>
            </select>
          </div>
        </div>
      )}

      {dateTbd ? (
        <input type="hidden" name="timeZone" value={event?.timeZone ?? "America/Chicago"} />
      ) : null}

      <div>
        <label htmlFor="registrationUrl" className="mb-1.5 block text-sm font-medium text-gray-700">
          Registration link <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <input
          id="registrationUrl"
          name="registrationUrl"
          type="url"
          defaultValue={event?.registrationUrl ?? ""}
          placeholder="Leave blank to use WhatsApp RSVP"
          className="h-11 w-full rounded-md border border-gray-200 px-3"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" name="published" defaultChecked={event?.published !== false} />
        Show on the website
      </label>

      <button
        type="submit"
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#9d174d] px-7 text-sm font-medium tracking-wide text-white hover:bg-[#831843] sm:w-auto"
      >
        {event ? "Save event" : "Add event"}
      </button>
    </form>
  )
}
