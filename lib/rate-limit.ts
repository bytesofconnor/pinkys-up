/**
 * Simple in-memory rate limiting for quote form submissions.
 * 
 * IMPORTANT LIMITATIONS FOR SERVERLESS:
 * - Each serverless instance has its own memory, so rate limits are NOT shared across instances
 * - In a serverless environment (like Vercel), a user could bypass the limit by hitting different instances
 * - This provides basic protection against simple spam/abuse, but NOT production-grade distributed rate limiting
 * 
 * For production-grade rate limiting in serverless, consider:
 * - Upstash Rate Limit (Redis-based, shared across all instances)
 * - Vercel Edge Config with KV storage
 * - Database-backed rate limiting
 * - Third-party services like Arcjet or Unkey
 * 
 * Current configuration:
 * - Window: 1 hour (60 minutes)
 * - Max attempts: 5 per client IP per window per instance
 */

type RateLimitEntry = {
  count: number
  resetAt: number
}

const attempts = new Map<string, RateLimitEntry>()

const WINDOW_MS = 60 * 60 * 1000
const MAX_ATTEMPTS = 5

function prune(now: number) {
  for (const [key, entry] of attempts) {
    if (now > entry.resetAt) {
      attempts.delete(key)
    }
  }
}

export function isRateLimited(key: string): boolean {
  const now = Date.now()
  prune(now)

  const entry = attempts.get(key)
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  if (entry.count >= MAX_ATTEMPTS) {
    return true
  }

  entry.count += 1
  return false
}
