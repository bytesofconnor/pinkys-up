import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { requireAdminToken } from "./lib/admin"
import { quoteDocValidator, serviceValidator } from "./lib/validators"

export const create = mutation({
  args: {
    adminToken: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    services: v.array(serviceValidator),
    eventType: v.string(),
    eventDate: v.string(),
    location: v.string(),
    guestCount: v.number(),
    referralSource: v.optional(v.string()),
    additionalDetails: v.optional(v.string()),
    emailSent: v.boolean(),
    emailError: v.optional(v.string()),
  },
  returns: v.id("quoteSubmissions"),
  handler: async (ctx, args) => {
    requireAdminToken(args.adminToken)

    return await ctx.db.insert("quoteSubmissions", {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      services: args.services,
      eventType: args.eventType,
      eventDate: args.eventDate,
      location: args.location,
      guestCount: args.guestCount,
      referralSource: args.referralSource,
      additionalDetails: args.additionalDetails,
      emailSent: args.emailSent,
      emailError: args.emailError,
    })
  },
})

export const listRecent = query({
  args: {
    adminToken: v.string(),
    limit: v.number(),
  },
  returns: v.array(quoteDocValidator),
  handler: async (ctx, args) => {
    requireAdminToken(args.adminToken)

    const limit = Math.min(Math.max(args.limit, 1), 200)
    return await ctx.db.query("quoteSubmissions").order("desc").take(limit)
  },
})

export const remove = mutation({
  args: {
    adminToken: v.string(),
    quoteId: v.id("quoteSubmissions"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    requireAdminToken(args.adminToken)

    const existing = await ctx.db.get("quoteSubmissions", args.quoteId)
    if (!existing) {
      throw new Error("Quote not found")
    }

    await ctx.db.delete("quoteSubmissions", args.quoteId)
    return null
  },
})
