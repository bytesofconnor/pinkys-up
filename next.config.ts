import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { NextConfig } from "next"

// Cursor/Vercel inject ADMIN_TOKEN into the shell. Next does not override that
// with .env.local, so a local code like `brendap` would never match.
if (process.env.NODE_ENV !== "production") {
  const envPath = resolve(process.cwd(), ".env.local")
  if (existsSync(envPath)) {
    for (const rawLine of readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const line = rawLine.trim()
      if (!line || line.startsWith("#")) continue
      const separator = line.indexOf("=")
      if (separator === -1) continue
      const key = line.slice(0, separator).trim()
      if (key !== "ADMIN_TOKEN") continue
      process.env.ADMIN_TOKEN = line.slice(separator + 1).trim()
    }
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/get-quote",
        destination: "/quote",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/#bars",
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ]
  },
}

export default nextConfig
