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
] as const

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
