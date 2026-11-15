import { expect, test } from "@playwright/test"

const pages = [
  {
    path: "/",
    heading: "Move. Connect. Celebrate.",
  },
  {
    path: "/events",
    heading: "Find Your Next Way to Connect.",
  },
  {
    path: "/mocktails",
    heading: "Mindfully Crafted Elixirs",
  },
  {
    path: "/quote",
    heading: "How can we help?",
  },
  {
    path: "/about",
    heading: "A zero-proof mocktail bar for DC and Minneapolis.",
  },
  {
    path: "/contact",
    heading: "How can we help?",
  },
  {
    path: "/gathering",
    heading: "Bring the cart to your gathering.",
  },
  {
    path: "/partners",
    heading: "Bring the bar to your venue.",
  },
] as const

test("primary nav is home, community events, and mobile mocktails", async ({ page }, testInfo) => {
  await page.goto("/", { waitUntil: "domcontentloaded" })

  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click()
  }

  const primary = page.getByRole("navigation", { name: "Primary" })
  await expect(primary.getByRole("link")).toHaveCount(3)
  await expect(primary.getByRole("link", { name: "Home", exact: true })).toBeVisible()
  await expect(primary.getByRole("link", { name: "Community Events", exact: true })).toBeVisible()
  await expect(primary.getByRole("link", { name: "Mobile Mocktails", exact: true })).toBeVisible()
  await expect(primary.getByRole("link", { name: "About", exact: true })).toHaveCount(0)
  await expect(primary.getByRole("link", { name: "1:1", exact: true })).toHaveCount(0)
  await expect(primary.getByRole("link", { name: "Quote", exact: true })).toHaveCount(0)
  await expect(page.getByRole("link", { name: "Contact", exact: true }).first()).toBeVisible()
})

for (const path of ["/", "/events"] as const) {
  test(`${path} links to the WhatsApp broadcast list`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" })

    const link = page.getByRole("link", { name: /Get event updates on WhatsApp/ }).first()
    await expect(link).toHaveAttribute("href", /^https:\/\/wa\.me\/15715014766\?text=/)

    const href = await link.getAttribute("href")
    expect(href).toBeTruthy()
    expect(new URL(href!).searchParams.get("text")).toContain("broadcast list")
  })
}

for (const pageDef of pages) {
  test(`${pageDef.path} returns 200 and renders ${pageDef.heading}`, async ({
    page,
  }) => {
    const response = await page.goto(pageDef.path, {
      waitUntil: "domcontentloaded",
    })

    expect(response, `expected a response for ${pageDef.path}`).toBeTruthy()
    expect(response!.status(), `${pageDef.path} HTTP status`).toBe(200)

    await expect(
      page.getByRole("link", { name: "Pinky's Up home" })
    ).toBeVisible()
    await expect(
      page.getByRole("heading", { name: pageDef.heading })
    ).toBeVisible()
  })
}

test("bottom strip does not cover the last quote field", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile")

  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/quote", { waitUntil: "domcontentloaded" })

  const field = page.locator("form").locator("input, textarea, select, button").last()
  await field.focus()

  const overlap = await page.evaluate(() => {
    const footer = document.querySelector("footer")?.getBoundingClientRect()
    const active = document.activeElement
    if (!footer || !(active instanceof HTMLElement) || active === document.body) {
      return { y: -1, label: "missing" }
    }
    const box = active.getBoundingClientRect()
    const x = Math.max(0, Math.min(box.right, footer.right) - Math.max(box.left, footer.left))
    const y = Math.max(0, Math.min(box.bottom, footer.bottom) - Math.max(box.top, footer.top))
    return {
      y: x > 0 ? y : 0,
      label: active.id || active.textContent?.trim() || active.tagName,
      fieldBottom: box.bottom,
      footerTop: footer.top,
    }
  })

  expect(overlap.y, JSON.stringify(overlap)).toBe(0)
})
