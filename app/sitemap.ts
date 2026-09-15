import type { MetadataRoute } from "next"

const site = "https://www.pinkysup.social"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/events", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/mocktails", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/quote", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/washington-dc", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/minneapolis", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/1-1", priority: 0.6, changeFrequency: "monthly" as const },
  ]

  return routes.map((route) => ({
    url: `${site}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
