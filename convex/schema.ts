import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  quoteSubmissions: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    services: v.array(v.string()),
    eventType: v.string(),
    eventDate: v.string(),
    location: v.string(),
    guestCount: v.number(),
    referralSource: v.optional(v.string()),
    additionalDetails: v.optional(v.string()),
    emailSent: v.boolean(),
    emailError: v.optional(v.string()),
  }).index("by_email", ["email"]),

  communityEvents: defineTable({
    name: v.string(),
    description: v.string(),
    startsAt: v.union(v.string(), v.null()),
    location: v.string(),
    timeZone: v.string(),
    registrationUrl: v.union(v.string(), v.null()),
    published: v.boolean(),
    updatedAt: v.number(),
  }).index("by_published", ["published"]),
})
