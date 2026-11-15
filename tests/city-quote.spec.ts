import { expect, test } from "@playwright/test"

const cities = [
  {
    path: "/washington-dc",
    lede: "zero-proof mocktail cart for DC weddings",
    body: "If you are looking for a non-alcoholic bar in Washington, DC",
  },
  {
    path: "/minneapolis",
    lede: "zero-proof mocktail bar to Minneapolis events",
    body: "Minneapolis and the Twin Cities get the same cart as DC",
  },
] as const

for (const city of cities) {
  test(`${city.path} shows Get a quote under the intro and above the fold`, async ({
    page,
  }, testInfo) => {
    await page.goto(city.path, { waitUntil: "domcontentloaded" })

    const quote = page.getByRole("link", { name: "Get a quote", exact: true })
    await expect(quote).toBeVisible()
    await expect(quote).toHaveAttribute("href", "/quote")

    const quoteBox = await quote.boundingBox()
    const ledeBox = await page.getByText(city.lede).boundingBox()
    const bodyBox = await page.getByText(city.body).boundingBox()
    const headingBox = await page.getByRole("heading", { level: 1 }).boundingBox()
    const footerBox = await page.locator("footer").boundingBox()
    const viewport = page.viewportSize()

    expect(quoteBox, "quote link has a box").toBeTruthy()
    expect(ledeBox, "intro lede has a box").toBeTruthy()
    expect(bodyBox, "body copy has a box").toBeTruthy()
    expect(headingBox, "heading has a box").toBeTruthy()
    expect(footerBox, "footer has a box").toBeTruthy()
    expect(viewport, "viewport is set").toBeTruthy()

    expect(quoteBox!.y).toBeGreaterThan(ledeBox!.y + ledeBox!.height)
    expect(quoteBox!.y + quoteBox!.height).toBeLessThan(bodyBox!.y)
    expect(quoteBox!.y).toBeGreaterThanOrEqual(0)
    expect(quoteBox!.y + quoteBox!.height).toBeLessThanOrEqual(viewport!.height)
    expect(quoteBox!.y + quoteBox!.height).toBeLessThanOrEqual(footerBox!.y)

    const headingCenter = headingBox!.x + headingBox!.width / 2
    const quoteCenter = quoteBox!.x + quoteBox!.width / 2
    expect(
      Math.abs(quoteCenter - headingCenter),
      "Get a quote is centered with the heading",
    ).toBeLessThan(8)

    expect(viewport).toEqual(
      testInfo.project.name === "mobile"
        ? { width: 390, height: 844 }
        : { width: 1280, height: 800 },
    )
  })
}
