import { env } from "../_generated/server"

export function requireAdminToken(token: string) {
  const expected = env.ADMIN_TOKEN?.trim()
  if (!expected) {
    throw new Error("Admin token is not configured")
  }
  if (token.trim() !== expected) {
    throw new Error("Unauthorized")
  }
}
