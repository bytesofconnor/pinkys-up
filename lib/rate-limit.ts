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
