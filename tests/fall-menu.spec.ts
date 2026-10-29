import { expect, test } from "@playwright/test"

const tamarackNote = "Include the fall draft Tamarack."

test("a fall draft on the mocktails page opens that drink on the cart", async ({ page }) => {
  await page.goto("/mocktails", { waitUntil: "domcontentloaded" })

  await expect(page.getByRole("heading", { name: "Seasonal drafts" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "North Shore Cedar" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Cranberry Bog" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Orchard Fizz" })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Tamarack" })).toBeVisible()

  const askForTamarack = page.getByRole("link", { name: "Ask for Tamarack" })
  await expect(askForTamarack).toBeVisible()
  await askForTamarack.click()

  await expect(page).toHaveURL(/[?&]for=mocktails(?:&|$)/)
  await expect(page).toHaveURL(/[?&]drink=tamarack(?:&|$)/)
  await expect(page.getByRole("heading", { name: "How can we help?" })).toBeVisible()
  await expect(page.getByRole("button", { name: "Mocktail cart" })).toHaveAttribute("aria-pressed", "true")
  await expect(page.getByRole("textbox", { name: "Anything else we should know?" })).toHaveValue(tamarackNote)
})

test("an unknown drink leaves the note empty and keeps the cart selected", async ({ page }) => {
  await page.goto("/quote?for=mocktails&drink=not-a-drink", { waitUntil: "domcontentloaded" })

  await expect(page.getByRole("button", { name: "Mocktail cart" })).toHaveAttribute("aria-pressed", "true")
  await expect(page.getByRole("textbox", { name: "Anything else we should know?" })).toHaveValue("")
})

test("a drink link without the cart service still names the drink", async ({ page }) => {
  await page.goto("/quote?drink=tamarack", { waitUntil: "domcontentloaded" })

  await expect(page.getByRole("textbox", { name: "Anything else we should know?" })).toHaveValue(tamarackNote)
  await expect(page.getByRole("button", { name: "Mocktail cart" })).toHaveAttribute("aria-pressed", "false")
  await expect(page.getByRole("button", { name: "Community events" })).toHaveAttribute("aria-pressed", "false")
})

test("a drink id matches after the case is normalized", async ({ page }) => {
  await page.goto("/quote?for=mocktails&drink=TAMARACK", { waitUntil: "domcontentloaded" })

  await expect(page.getByRole("button", { name: "Mocktail cart" })).toHaveAttribute("aria-pressed", "true")
  await expect(page.getByRole("textbox", { name: "Anything else we should know?" })).toHaveValue(tamarackNote)
})
