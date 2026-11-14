import { expect, test } from "@playwright/test"

const djLine = /curated playlists and vibe setting for the event/i

test("/menu lands on the mocktail menu", async ({ page }) => {
  const response = await page.goto("/menu", { waitUntil: "domcontentloaded" })

  expect(response, "expected a response for /menu").toBeTruthy()
  expect(response!.status(), "/menu final status").toBe(200)
  await expect(page).toHaveURL(/\/mocktails\/?$/)

  const redirect = response!.request().redirectedFrom()
  expect(redirect, "expected /menu to redirect").toBeTruthy()
  expect(new URL(redirect!.url()).pathname).toBe("/menu")
  const redirectResponse = await redirect!.response()
  expect(redirectResponse?.status(), "/menu redirect status").toBe(308)

  await expect(page.getByRole("heading", { name: "Mindfully Crafted Elixirs" })).toBeVisible()
})

test("homepage does not link to an Instagram story", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" })

  await expect(page.locator('a[href*="instagram.com/stories"]')).toHaveCount(0)
  await expect(
    page.getByRole("link", { name: "Brenda Pereira Vargas, founder of PINKYS UP" })
  ).toHaveAttribute("href", "https://www.instagram.com/pinkysup_dc")
})

test("open graph image is a 1200 by 630 card under 300KB", async ({ request }) => {
  const response = await request.get("/opengraph-image")
  expect(response.status()).toBe(200)

  const type = response.headers()["content-type"] ?? ""
  expect(type).toMatch(/image\/(?:png|jpeg)/)

  const body = await response.body()
  expect(body.byteLength).toBeLessThan(300 * 1024)
  expect(imageSize(body)).toEqual({ width: 1200, height: 630 })
})

test("DJ service is described with the services", async ({ page }) => {
  await page.goto("/faq", { waitUntil: "domcontentloaded" })
  await expect(page.getByText("Do you offer DJ service?")).toBeVisible()
  await expect(page.getByText(djLine).first()).toBeVisible()

  await page.goto("/quote", { waitUntil: "domcontentloaded" })
  const dj = page.getByRole("checkbox", { name: "DJ Service" })
  await expect(dj).toBeVisible()
  await expect(dj).toBeEnabled()
  await expect(page.getByText(djLine)).toBeVisible()

  await page.goto("/", { waitUntil: "domcontentloaded" })
  await expect(page.getByText(djLine)).toBeVisible()

  for (const path of ["/washington-dc", "/minneapolis"] as const) {
    await page.goto(path, { waitUntil: "domcontentloaded" })
    await expect(page.getByText(djLine)).toBeVisible()
  }
})

function imageSize(body: Buffer) {
  if (body.length >= 24 && body[0] === 0x89 && body.toString("ascii", 1, 4) === "PNG") {
    return { width: body.readUInt32BE(16), height: body.readUInt32BE(20) }
  }

  if (body[0] === 0xff && body[1] === 0xd8) {
    let offset = 2
    while (offset + 9 < body.length) {
      if (body[offset] !== 0xff) break
      const marker = body[offset + 1]
      if (marker === 0xd8 || marker === 0xd9) {
        offset += 2
        continue
      }
      const length = body.readUInt16BE(offset + 2)
      if (marker >= 0xc0 && marker <= 0xc2) {
        return {
          height: body.readUInt16BE(offset + 5),
          width: body.readUInt16BE(offset + 7),
        }
      }
      offset += 2 + length
    }
  }

  throw new Error(`unrecognized image (${body.byteLength} bytes)`)
}
