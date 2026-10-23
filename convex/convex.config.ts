import { defineApp } from "convex/server"
import { v } from "convex/values"

const app = defineApp({
  env: {
    ADMIN_TOKEN: v.optional(v.string()),
  },
})

export default app
