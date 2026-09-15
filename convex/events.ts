import { mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { requireAdminToken } from "./lib/admin"
import { eventDocValidator, eventInputValidator } from "./lib/validators"

export const listPublished = query({
  args: {},
  returns: v.array(eventDocValidator),
  handler: async (ctx) => {
    return await ctx.db
      .query("communityEvents")
      .withIndex("by_published", (q) => q.eq("published", true))
      .take(100)
  },
})

export const listAll = query({
  args: {
    adminToken: v.string(),
  },
  returns: v.array(eventDocValidator),
  handler: async (ctx, args) => {
    requireAdminToken(args.adminToken)
    return await ctx.db.query("communityEvents").order("desc").take(200)
  },
})

export const get = query({
  args: {
    adminToken: v.string(),
    eventId: v.id("communityEvents"),
  },
  returns: v.union(eventDocValidator, v.null()),
  handler: async (ctx, args) => {
    requireAdminToken(args.adminToken)
    return await ctx.db.get("communityEvents", args.eventId)
  },
})

export const create = mutation({
  args: {
    adminToken: v.string(),
    ...eventInputValidator,
  },
  returns: v.id("communityEvents"),
  handler: async (ctx, args) => {
    requireAdminToken(args.adminToken)

    return await ctx.db.insert("communityEvents", {
      name: args.name,
      description: args.description,
      startsAt: args.startsAt,
      location: args.location,
      timeZone: args.timeZone,
      registrationUrl: args.registrationUrl,
      published: args.published,
      updatedAt: Date.now(),
    })
  },
})

export const update = mutation({
  args: {
    adminToken: v.string(),
    eventId: v.id("communityEvents"),
    ...eventInputValidator,
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    requireAdminToken(args.adminToken)

    const existing = await ctx.db.get("communityEvents", args.eventId)
    if (!existing) {
      throw new Error("Event not found")
    }

    await ctx.db.patch("communityEvents", args.eventId, {
      name: args.name,
      description: args.description,
      startsAt: args.startsAt,
      location: args.location,
      timeZone: args.timeZone,
      registrationUrl: args.registrationUrl,
      published: args.published,
      updatedAt: Date.now(),
    })

    return null
  },
})

export const remove = mutation({
  args: {
    adminToken: v.string(),
    eventId: v.id("communityEvents"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    requireAdminToken(args.adminToken)

    const existing = await ctx.db.get("communityEvents", args.eventId)
    if (!existing) {
      throw new Error("Event not found")
    }

    await ctx.db.delete("communityEvents", args.eventId)
    return null
  },
})
