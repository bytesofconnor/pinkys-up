import assert from "node:assert/strict"
import { register } from "node:module"
import { describe, it } from "node:test"

const workspace = new URL("../", import.meta.url).href
const resolver = `
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const url = new URL(specifier.slice(2) + ".ts", ${JSON.stringify(workspace)})
    return nextResolve(url.href, context)
  }
  if (
    (specifier.startsWith("./") || specifier.startsWith("../")) &&
    !specifier.endsWith(".ts") &&
    !specifier.endsWith(".js")
  ) {
    return nextResolve(specifier + ".ts", context)
  }
  return nextResolve(specifier, context)
}
`
register(`data:text/javascript,${encodeURIComponent(resolver)}`, import.meta.url)

const { mocktails } = await import("./mocktails")
const {
  bookingSteps,
  getLanding,
  includedItems,
  landingIds,
  landingMetadata,
  landingPath,
  landingSitemapUrls,
} = await import("./landings")

describe("service landings", () => {
  it("publishes the wedding paths and keeps them in the sitemap", () => {
    assert.equal(landingPath("washington-dc-weddings"), "/washington-dc/weddings")
    assert.equal(landingPath("minneapolis-weddings"), "/minneapolis/weddings")
    assert.equal(landingPath("sober-wedding-bar"), "/sober-wedding-bar")

    const urls = landingSitemapUrls()
    for (const id of ["washington-dc-weddings", "minneapolis-weddings", "sober-wedding-bar"] as const) {
      assert.ok(urls.includes(`https://www.pinkysup.social${landingPath(id)}`))
    }
  })

  it("uses one menu sentence built from the mocktail data", () => {
    const menu = includedItems().find((item) => item.title === "A custom zero-proof menu")
    assert.ok(menu)
    for (const drink of mocktails) {
      assert.match(menu.body, new RegExp(drink.name))
    }
    assert.equal(bookingSteps.length, 4)
    assert.equal(bookingSteps[1].title, "Brenda follows up by email")
    assert.match(bookingSteps[1].body, /replies by email/)
    assert.doesNotMatch(bookingSteps.map((step) => step.body).join(" "), /24 hours|calendly|\$/i)
  })

  it("gives every landing a unique title, description, and canonical path", () => {
    const titles = new Set<string>()
    const descriptions = new Set<string>()
    for (const id of landingIds) {
      const meta = landingMetadata(id)
      assert.equal(typeof meta.title, "string")
      assert.equal(typeof meta.description, "string")
      titles.add(meta.title as string)
      descriptions.add(meta.description as string)
      const canonical = meta.alternates?.canonical
      assert.equal(canonical, `https://www.pinkysup.social${landingPath(id)}`)
      const page = getLanding(id)
      assert.ok(page.faqs.length >= 3)
      assert.ok(page.areas.length >= 1)
      const blob = JSON.stringify(page)
      assert.doesNotMatch(blob, /24 hours|calendly|testimonial|\$\d/i)
    }
    assert.equal(titles.size, landingIds.length)
    assert.equal(descriptions.size, landingIds.length)
  })
})
