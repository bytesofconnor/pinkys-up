import type { MetadataRoute } from "next"

const site = "https://www.pinkysup.social"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/events", "/mocktails", "/1-1", "/quote"]

  return routes.map((route) => ({
    url: `${site}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/events" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }))
}
