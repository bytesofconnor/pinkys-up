# PINKYS UP

Zero-proof mocktails and community wellness in Washington, DC and Minneapolis.

**Live:** [www.pinkysup.social](https://www.pinkysup.social)

Dashboards, env vars, and which service owns what: **[OPS.md](./OPS.md)**.

This README is how the site works and how Brenda uses admin.

## What the site does

| Page | Purpose |
| --- | --- |
| `/` | Homepage: next community date, mocktail cart, founder |
| `/events` | Community dates. Empty until Brenda adds one in admin |
| `/mocktails` | Three signature drinks |
| `/1-1` | Book time with Brenda (Calendly if set, otherwise WhatsApp) |
| `/quote` | Cart and community-event quote form |
| `/admin` | Access-code login, then **Insights**, **Events**, and **Quotes** |

Quotes email Brenda **and** save to Convex. A request still counts if only one of those succeeds. Events Brenda publishes in admin show on `/` and `/events`.

## For Brenda: posting events and reading quotes

1. Go to [pinkysup.social/admin](https://www.pinkysup.social/admin)
2. Enter the access code (same value as `ADMIN_TOKEN` — keep it in a password manager)
3. **Events → Add event**
   - Name, description, city, date (or leave the date TBD)
   - Leave the registration link blank for WhatsApp RSVP, or paste a real Eventbrite URL
   - Uncheck **Show on the website** to hide a date without deleting it
4. **Quotes** is the inbox for `/quote` submissions (name, contact, services, date)

You never need GitHub or JSON for this.

## Local development

```bash
npm install
```

Use two terminals:

```bash
npm run convex:dev    # syncs Convex functions (writes NEXT_PUBLIC_CONVEX_URL into .env.local)
npm run dev           # Next.js at http://localhost:3000
```

Copy `.env.example` to `.env.local` and fill in secrets. `npx convex dev` will add the Convex URL for you.

Open `/admin` locally with the same `ADMIN_TOKEN`.

## Environment variables

Names, which dashboard they live in, and prod vs local URLs: **[OPS.md](./OPS.md)**. Copy `.env.example` to `.env.local` for local work.

`ADMIN_TOKEN` must match on Next **and** the Convex deployment that `NEXT_PUBLIC_CONVEX_URL` points at. `NEXT_PUBLIC_CONVEX_URL` is Vercel **Config**, not Secret.

## Shipping

Details: **[OPS.md](./OPS.md)**. GitHub `main` → Vercel. Say **ship it** to commit and push. Do not force-push. Run `npx convex deploy` only when `convex/` should update production.

## Stack

- Next.js 16 (App Router) on Vercel
- Convex for quotes and community events
- Resend for quote email
- Tailwind + Framer Motion
- Vercel Analytics + Speed Insights; Brenda-facing counts at `/admin/insights`

## Brand

- Name is **PINKYS UP** (no “DC” in the wordmark)
- Instagram / TikTok: `pinkysup_dc`
- Cities: Washington, DC and Minneapolis
- Don’t invent Eventbrite URLs, Calendly links, fake events, or political drink names

## Contact

- WhatsApp: [+1 571 501 4766](https://wa.me/15715014766)
- Instagram: [@pinkysup_dc](https://instagram.com/pinkysup_dc)
- TikTok: [@pinkysup_dc](https://tiktok.com/@pinkysup_dc)
