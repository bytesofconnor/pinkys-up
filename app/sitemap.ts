import type { MetadataRoute } from "next"
import { sitemapEntries } from "@/lib/destinations"

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries()
}
