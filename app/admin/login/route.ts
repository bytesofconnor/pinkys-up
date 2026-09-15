import { NextResponse } from "next/server"
import { ADMIN_COOKIE, adminCookieOptions, getAdminToken } from "@/lib/admin"

export async function POST(request: Request) {
  const formData = await request.formData()
  const token = String(formData.get("token") ?? "").trim()
  const adminToken = getAdminToken()
  const origin = new URL(request.url).origin

  if (!adminToken || token !== adminToken) {
    return NextResponse.redirect(`${origin}/admin?error=1`, 303)
  }

  const response = NextResponse.redirect(`${origin}/admin/events`, 303)
  response.cookies.set(ADMIN_COOKIE, adminToken, adminCookieOptions())
  return response
}
