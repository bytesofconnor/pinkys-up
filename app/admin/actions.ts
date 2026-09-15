"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { ADMIN_COOKIE, isAdmin } from "@/lib/admin"
import { createEvent, deleteEvent, updateEvent } from "@/lib/events-db"
import { wallTimeToIso } from "@/lib/timezone"

const TIME_ZONES = ["America/New_York", "America/Chicago"] as const

const eventSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(500),
  location: z.string().trim().min(1).max(200),
  timeZone: z.enum(TIME_ZONES),
  date: z.string().optional(),
  time: z.string().optional(),
  dateTbd: z.enum(["on"]).optional(),
  registrationUrl: z.string().trim().max(500).optional(),
  published: z.enum(["on"]).optional(),
})

function revalidatePublic() {
  revalidatePath("/")
  revalidatePath("/events")
}

export async function loginAdmin(formData: FormData) {
  const adminToken = process.env.ADMIN_TOKEN
  const token = String(formData.get("token") ?? "")
  if (!adminToken || token !== adminToken) {
    redirect("/admin?error=1")
  }

  const jar = await cookies()
  jar.set(ADMIN_COOKIE, adminToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })

  redirect("/admin/events")
}

export async function logoutAdmin() {
  const jar = await cookies()
  jar.delete(ADMIN_COOKIE)
  redirect("/admin")
}

function parseEventForm(formData: FormData) {
  const parsed = eventSchema.safeParse({
    id: formData.get("id") || undefined,
    name: formData.get("name"),
    description: formData.get("description"),
    location: formData.get("location"),
    timeZone: formData.get("timeZone"),
    date: formData.get("date") || undefined,
    time: formData.get("time") || undefined,
    dateTbd: formData.get("dateTbd") || undefined,
    registrationUrl: formData.get("registrationUrl") || undefined,
    published: formData.get("published") || undefined,
  })

  if (!parsed.success) {
    throw new Error("Please fill out the event details.")
  }

  const dateTbd = parsed.data.dateTbd === "on" || !parsed.data.date || !parsed.data.time
  const registrationUrl = parsed.data.registrationUrl?.trim() || null

  if (registrationUrl && !/^https?:\/\//i.test(registrationUrl)) {
    throw new Error("Registration link must start with http:// or https://")
  }

  return {
    id: parsed.data.id,
    name: parsed.data.name,
    description: parsed.data.description,
    location: parsed.data.location,
    timeZone: parsed.data.timeZone,
    startsAt: dateTbd ? null : wallTimeToIso(parsed.data.date!, parsed.data.time!, parsed.data.timeZone),
    registrationUrl,
    published: parsed.data.published === "on",
  }
}

export async function saveEvent(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/admin")
  }

  const event = parseEventForm(formData)

  if (event.id) {
    await updateEvent(event.id, event)
  } else {
    await createEvent(event)
  }

  revalidatePublic()
  redirect("/admin/events")
}

export async function removeEvent(formData: FormData) {
  if (!(await isAdmin())) {
    redirect("/admin")
  }

  const id = String(formData.get("id") ?? "")
  if (!id) {
    throw new Error("Missing event")
  }

  await deleteEvent(id)
  revalidatePublic()
  redirect("/admin/events")
}
