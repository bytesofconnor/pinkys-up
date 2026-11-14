import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt =
  "PINKYS UP — Move. Connect. Celebrate. in Washington, DC and Minneapolis"
export const size = { width: 1200, height: 630 }
export const contentType = "image/jpeg"

export default async function Image() {
  const jpeg = await readFile(join(process.cwd(), "app/share-card.jpg"))
  return new Response(jpeg, {
    headers: { "Content-Type": contentType },
  })
}
