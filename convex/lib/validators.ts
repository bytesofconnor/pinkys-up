import { v } from "convex/values"

export const serviceValidator = v.union(
  v.literal("mocktails"),
  v.literal("events"),
  v.literal("bar"),
  v.literal("mixologist"),
  v.literal("glassware"),
  v.literal("custom"),
  v.literal("dj")
)

export const quoteDocValidator = v.object({
  _id: v.id("quoteSubmissions"),
  _creationTime: v.number(),
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
})

export const eventDocValidator = v.object({
  _id: v.id("communityEvents"),
  _creationTime: v.number(),
  name: v.string(),
  description: v.string(),
  startsAt: v.union(v.string(), v.null()),
  location: v.string(),
  timeZone: v.string(),
  registrationUrl: v.union(v.string(), v.null()),
  published: v.boolean(),
  updatedAt: v.number(),
})

export const eventInputValidator = {
  name: v.string(),
  description: v.string(),
  startsAt: v.union(v.string(), v.null()),
  location: v.string(),
  timeZone: v.string(),
  registrationUrl: v.union(v.string(), v.null()),
  published: v.boolean(),
}
