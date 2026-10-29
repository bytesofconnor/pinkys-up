import { expect, test } from "@playwright/test"

test("partner page shows the pitch and the open roster", async ({ page }, testInfo) => {
  await page.goto("/partners", { waitUntil: "domcontentloaded" })

  await expect(page.getByRole("heading", { name: "Bring the bar to your venue." })).toBeVisible()
  await expect(page.getByRole("heading", { name: "An alcohol-free pop-up bar" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Community events that bring a crowd" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Co-promotion" })).toBeVisible()
  await expect(page.getByText("Founding partner spots open")).toBeVisible()
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Venue partners" })).toHaveCount(0)

  await page.screenshot({
    path: `/opt/cursor/artifacts/screenshots/partners-${testInfo.project.name}.png`,
    fullPage: true,
  })
})

test("an incomplete partner inquiry shows field errors and does not ask the server", async ({ page }, testInfo) => {
  await page.goto("/partners", { waitUntil: "domcontentloaded" })
  await page.getByRole("button", { name: "Send request" }).click()

  await expect(page.getByText("Name is required", { exact: true })).toBeVisible()
  await expect(page.getByText("Email is required")).toBeVisible()
  await expect(page.getByText("Venue name is required")).toBeVisible()
  await expect(page.getByText("Choose the kind of venue")).toBeVisible()
  await expect(page.getByText("City or area is required")).toBeVisible()
  await expect(page.getByRole("alert").filter({ hasText: "Unable to submit your request" })).toHaveCount(0)
  await expect(page.getByRole("heading", { name: "Thank you — we got it." })).toHaveCount(0)

  await page.screenshot({
    path: `/opt/cursor/artifacts/screenshots/partners-errors-${testInfo.project.name}.png`,
    fullPage: true,
  })
})

test("a complete partner inquiry calls the server action", async ({ page }) => {
  await page.goto("/partners", { waitUntil: "domcontentloaded" })
  await page.getByLabel("Your name").fill("Mary Jane Watson")
  await page.getByLabel("Email").fill("mary@example.com")
  await page.getByLabel("Venue name").fill("North Room")
  await page.getByLabel("Kind of venue").selectOption("brewery")
  await page.getByLabel("City or area").fill("Minneapolis")
  await page.getByRole("button", { name: "Send request" }).click()

  const alert = page.getByRole("alert").filter({ hasText: "Unable to submit your request" })
  await expect(alert).toContainText("Our booking system is temporarily unavailable.")
  await expect(page.getByText("Name is required", { exact: true })).toHaveCount(0)
})

test("events keeps the host quote and links to venue partners", async ({ page }) => {
  await page.goto("/events", { waitUntil: "domcontentloaded" })

  await expect(page.getByRole("link", { name: "Host or partner with us" }).first()).toHaveAttribute(
    "href",
    "/quote?for=events",
  )
  await expect(page.getByRole("link", { name: "Venue partners" }).first()).toHaveAttribute(
    "href",
    "/partners",
  )
})
