export const ALLOWED_SERVICES = ["bar", "mixologist", "glassware", "custom", "dj"] as const

export type AllowedService = (typeof ALLOWED_SERVICES)[number]
