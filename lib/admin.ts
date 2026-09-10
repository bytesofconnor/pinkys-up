import { cookies } from "next/headers"

export const ADMIN_COOKIE = "pinkys_admin"

export async function isAdmin(tokenFromQuery?: string) {
  const adminToken = process.env.ADMIN_TOKEN
  if (!adminToken) return false
  if (tokenFromQuery && tokenFromQuery === adminToken) return true
  const jar = await cookies()
  return jar.get(ADMIN_COOKIE)?.value === adminToken
}
