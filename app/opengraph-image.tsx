import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const alt =
  "PINKYS UP — Move. Connect. Celebrate. in Washington, DC and Minneapolis"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/1.jpg"))
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={photoSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            background:
              "linear-gradient(180deg, rgba(20,6,12,0.28) 0%, rgba(20,6,12,0.78) 100%)",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: 72,
          }}
        >
          <div
            style={{
              fontSize: 26,
              letterSpacing: 10,
              color: "rgba(255,255,255,0.92)",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Washington, DC · Minneapolis
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.12,
              color: "#ffd0e4",
              fontFamily: "Georgia, serif",
            }}
          >
            Move. Connect. Celebrate.
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 32,
              letterSpacing: 10,
              color: "#ffffff",
              textTransform: "uppercase",
            }}
          >
            PINKYS UP
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
