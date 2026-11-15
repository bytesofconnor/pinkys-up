import { expect, test } from "@playwright/test"

test("homepage leads with the cart and quote, then community events", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" })

  const book = page.getByRole("link", { name: "Book the cart", exact: true })
  await expect(book).toBeVisible()
  await expect(book).toHaveAttribute("href", "/quote?for=mocktails")

  const bookBox = await book.boundingBox()
  const viewport = page.viewportSize()
  expect(bookBox, "book the cart has a box").toBeTruthy()
  expect(viewport, "viewport is set").toBeTruthy()
  expect(bookBox!.y).toBeGreaterThanOrEqual(0)
  expect(bookBox!.y + bookBox!.height).toBeLessThanOrEqual(viewport!.height)

  const cart = page.getByRole("heading", { name: "A Mocktail Experience for Your People" })
  const events = page.getByRole("heading", { name: "Find Your Next Way to Connect." })
  const cartBox = await cart.boundingBox()
  const eventsBox = await events.boundingBox()
  expect(cartBox, "cart heading has a box").toBeTruthy()
  expect(eventsBox, "events heading has a box").toBeTruthy()
  expect(cartBox!.y).toBeLessThan(eventsBox!.y)

  const empty = page.getByText("Nothing is on the calendar yet.")
  if ((await empty.count()) > 0) {
    const emptyBox = await empty.boundingBox()
    expect(emptyBox!.y).toBeGreaterThan(cartBox!.y)
  }

  await book.click()
  await expect(page).toHaveURL(/\/quote\?for=mocktails$/)
  await expect(page.getByRole("heading", { name: "How can we help?" })).toBeVisible()
})
