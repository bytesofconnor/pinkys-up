import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const allowPublic = {
    allow: "/",
    disallow: "/admin",
  }

  return {
    rules: [
      { userAgent: "*", ...allowPublic },
      { userAgent: "GPTBot", ...allowPublic },
      { userAgent: "ChatGPT-User", ...allowPublic },
      { userAgent: "OAI-SearchBot", ...allowPublic },
      { userAgent: "PerplexityBot", ...allowPublic },
      { userAgent: "ClaudeBot", ...allowPublic },
      { userAgent: "Google-Extended", ...allowPublic },
      { userAgent: "Applebot-Extended", ...allowPublic },
    ],
    sitemap: "https://www.pinkysup.social/sitemap.xml",
    host: "https://www.pinkysup.social",
  }
}
