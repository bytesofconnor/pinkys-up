import { cookies } from "next/headers"

export const ADMIN_COOKIE = "pinkys_admin"

export function getAdminToken() {
  return process.env.ADMIN_TOKEN?.trim() || ""
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  }
}

export async function isAdmin(tokenFromQuery?: string) {
  const adminToken = getAdminToken()
  if (!adminToken) return false
  if (tokenFromQuery && tokenFromQuery.trim() === adminToken) return true
  const jar = await cookies()
  return jar.get(ADMIN_COOKIE)?.value === adminToken
}
