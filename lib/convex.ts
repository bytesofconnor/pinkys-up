export function convexConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_CONVEX_URL)
}

export function getAdminToken() {
  const token = process.env.ADMIN_TOKEN
  if (!token) {
    throw new Error("ADMIN_TOKEN is not configured")
  }
  return token
}
