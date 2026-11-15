import { expect, test } from "@playwright/test"

const pages = [
  {
    path: "/washington-dc/weddings",
    heading: "Mocktail bar rental for Washington, DC weddings",
    title: "Mocktail bar rental for Washington, DC weddings | PINKYS UP",
  },
  {
    path: "/minneapolis/weddings",
    heading: "A mobile mocktail bar for Minneapolis weddings",
    title: "A mobile mocktail bar for Minneapolis weddings | PINKYS UP",
  },
  {
    path: "/sober-wedding-bar",
    heading: "A sober wedding bar and non-alcoholic bar",
    title: "A sober wedding bar and non-alcoholic bar | PINKYS UP",
  },
] as const

for (const pageDef of pages) {
  test(`${pageDef.path} renders, quotes above the fold, and has valid JSON-LD`, async ({
    page,
  }, testInfo) => {
    const response = await page.goto(pageDef.path, { waitUntil: "domcontentloaded" })

    expect(response?.status(), `${pageDef.path} HTTP status`).toBe(200)
    await expect(page.getByRole("heading", { level: 1, name: pageDef.heading })).toBeVisible()
    await expect(page).toHaveTitle(pageDef.title)
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.pinkysup.social${pageDef.path}`,
    )
    await expect(page.getByRole("heading", { name: "How booking works" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "What is included" })).toBeVisible()
    await expect(page.getByText("Pinkies Up is Brenda Pereira Vargas's zero-proof mocktail cart")).toBeVisible()

    const quote = page.getByRole("link", { name: "Get a quote", exact: true })
    await expect(quote).toBeVisible()
    await expect(quote).toHaveAttribute("href", "/quote")

    const quoteBox = await quote.boundingBox()
    const footerBox = await page.locator("footer").boundingBox()
    const viewport = page.viewportSize()
    expect(quoteBox, "quote link has a box").toBeTruthy()
    expect(footerBox, "footer has a box").toBeTruthy()
    expect(viewport, "viewport is set").toBeTruthy()
    expect(quoteBox!.y).toBeGreaterThanOrEqual(0)
    expect(quoteBox!.y + quoteBox!.height).toBeLessThanOrEqual(viewport!.height)
    expect(quoteBox!.y + quoteBox!.height).toBeLessThanOrEqual(footerBox!.y)

    if (testInfo.project.name === "mobile") {
      expect(viewport).toEqual({ width: 390, height: 844 })
    } else {
      expect(viewport).toEqual({ width: 1280, height: 800 })
    }

    const schemas = await page.locator('script[type="application/ld+json"]').allTextContents()
    expect(schemas.length).toBeGreaterThan(0)
    const types = schemas.flatMap((raw) => jsonLdTypes(JSON.parse(raw)))
    expect(types).toEqual(expect.arrayContaining(["BreadcrumbList", "FAQPage", "Service", "LocalBusiness"]))

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    const overlap = await page.evaluate(() => {
      const footer = document.querySelector("footer")?.getBoundingClientRect()
      const main = document.querySelector("main")
      if (!footer || !main) return -1
      let max = 0
      for (const node of main.querySelectorAll("h1, h2, h3, p, a, li")) {
        const box = node.getBoundingClientRect()
        const x = Math.max(0, Math.min(box.right, footer.right) - Math.max(box.left, footer.left))
        const y = Math.max(0, Math.min(box.bottom, footer.bottom) - Math.max(box.top, footer.top))
        if (x > 0 && y > 0 && box.width > 0 && box.height > 0) max = Math.max(max, y)
      }
      return max
    })
    expect(overlap, "footer covers page content").toBe(0)
  })
}

test("city pages name areas once and do not repeat the menu in the intro", async ({ page }) => {
  for (const path of ["/washington-dc", "/minneapolis"] as const) {
    await page.goto(path, { waitUntil: "domcontentloaded" })
    await expect(page.getByRole("heading", { name: "Areas served" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "How booking works" })).toBeVisible()
    await expect(page.getByRole("heading", { name: "Event types" })).toBeVisible()
    const body = await page.locator("main").innerText()
    const blush = body.match(/Blush Hour/g) ?? []
    expect(blush, `${path} lists each signature drink once`).toHaveLength(1)
  }
})

function jsonLdTypes(value: unknown): string[] {
  if (!value || typeof value !== "object") return []
  if (Array.isArray(value)) return value.flatMap((item) => jsonLdTypes(item))
  const record = value as { "@type"?: unknown; "@graph"?: unknown }
  const own = typeof record["@type"] === "string" ? [record["@type"]] : []
  return [...own, ...jsonLdTypes(record["@graph"])]
}
