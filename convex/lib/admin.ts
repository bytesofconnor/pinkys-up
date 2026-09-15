export function requireAdminToken(token: string) {
  const expected = process.env.ADMIN_TOKEN
  if (!expected) {
    throw new Error("Admin token is not configured")
  }
  if (token !== expected) {
    throw new Error("Unauthorized")
  }
}
