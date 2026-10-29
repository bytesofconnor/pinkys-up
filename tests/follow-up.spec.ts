import { expect, test, type Page } from "@playwright/test"

async function waitForHydratedFollowUp(page: Page) {
  await page.goto("/follow-up", { waitUntil: "domcontentloaded" })
  await page.waitForFunction(() => {
    const input = document.querySelector("#hostName")
    return Boolean(input && Object.keys(input).some((key) => key.startsWith("__reactProps")))
  })
}

test("follow-up is a private note page", async ({ page }, testInfo) => {
  const response = await page.goto("/follow-up", { waitUntil: "domcontentloaded" })

  expect(response, "expected a response for /follow-up").toBeTruthy()
  expect(response!.status(), "/follow-up HTTP status").toBe(200)
  await expect(page.getByRole("heading", { name: "How was it?" })).toBeVisible()
  await expect(page).toHaveTitle("Leave a note | PINKYS UP")
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/)
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /nofollow/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/follow-up$/)

  const directory = page.getByRole("navigation", { name: "Site" })
  const hrefs = await directory.getByRole("link").evaluateAll((links) =>
    links.map((item) => item.getAttribute("href")),
  )
  expect(hrefs).not.toContain("/follow-up")
  await expect(page.locator('a[href="/follow-up"]')).toHaveCount(0)

  await page.screenshot({
    path: `/opt/cursor/artifacts/screenshots/follow-up-${testInfo.project.name}.png`,
    fullPage: true,
  })

  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open menu" }).click()
  }

  const primary = page.getByRole("navigation", { name: "Primary" })
  await expect(primary.getByRole("link")).toHaveCount(3)
  await expect(primary.getByRole("link", { name: "Home", exact: true })).toBeVisible()
  await expect(primary.getByRole("link", { name: "Community Events", exact: true })).toBeVisible()
  await expect(primary.getByRole("link", { name: "Mobile Mocktails", exact: true })).toBeVisible()
})

test("an incomplete note shows field errors and does not ask the server", async ({ page }, testInfo) => {
  await waitForHydratedFollowUp(page)
  await page.getByRole("button", { name: "Send request" }).click()

  await expect(page.getByText("Name is required", { exact: true })).toBeVisible()
  await expect(page.getByText("Email is required")).toBeVisible()
  await expect(page.getByText("Choose a rating from 1 to 5.")).toBeVisible()
  await expect(page.getByText("A short note is required.")).toBeVisible()
  await expect(page.getByText("1 is rough. 5 is wonderful.")).toBeVisible()
  await expect(page.getByRole("alert").filter({ hasText: "Unable to submit your request" })).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Thank you — we got it." })).toHaveCount(0)

  await page.screenshot({
    path: `/opt/cursor/artifacts/screenshots/follow-up-errors-${testInfo.project.name}.png`,
    fullPage: true,
  })
})

test("a complete note calls the server action", async ({ page }, testInfo) => {
  await waitForHydratedFollowUp(page)
  await page.getByLabel("Your name").fill("Mary Jane Watson")
  await page.getByLabel("Email").fill("mary@example.com")
  await page.getByRole("radio", { name: "5" }).check()
  await page.getByRole("textbox", { name: "Note", exact: true }).fill("Short note.")
  await page.getByRole("checkbox", { name: "I want to rebook or get a new quote" }).check()
  await page.getByRole("button", { name: "Send request" }).click()

  const alert = page.getByRole("alert").filter({ hasText: "Unable to submit your request" })
  await expect(alert).toContainText("Our booking system is temporarily unavailable.")
  await expect(page.getByText("Name is required", { exact: true })).toHaveCount(0)

  await page.screenshot({
    path: `/opt/cursor/artifacts/screenshots/follow-up-submit-${testInfo.project.name}.png`,
    fullPage: true,
  })
})
