# PINKYS UP

Zero-proof mocktails and community wellness in Washington, DC and Minneapolis.

**Live:** [www.pinkysup.social](https://www.pinkysup.social)

This README is the operating manual for the site: what it does, how Brenda runs it, and how to develop and ship.

## What the site does

| Page | Purpose |
| --- | --- |
| `/` | Homepage: next community date, mocktail cart, founder |
| `/events` | Community dates. Empty until Brenda adds one in admin |
| `/mocktails` | Three signature drinks |
| `/1-1` | Book time with Brenda (Calendly if set, otherwise WhatsApp) |
| `/quote` | Cart and community-event quote form |
| `/admin` | Access-code login, then **Events** and **Quotes** |

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

Set these on **Vercel** (Production and Preview). `ADMIN_TOKEN` must also be set in the **Convex dashboard** on both the dev and prod deployments.

| Variable | Where | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_CONVEX_URL` | Vercel, as **Config** (not Secret) | Public on purpose. Production: `https://cautious-sheep-629.convex.cloud` |
| `ADMIN_TOKEN` | Vercel **Secret** + Convex dashboard | Access code for `/admin`. Same value in both places |
| `RESEND_API_KEY` | Vercel **Secret** | Sends quote emails |
| `QUOTE_NOTIFICATION_EMAIL` | Vercel | Inbox for new quotes. Falls back to Brenda’s Gmail if unset |
| `RESEND_FROM_EMAIL` | Vercel | Defaults to `Pinkys Up <onboarding@resend.dev>` until the domain is verified in Resend |
| `SEND_GUEST_CONFIRMATION` | Vercel | Set `true` to email the guest a copy. Off by default |
| `NEXT_PUBLIC_CALENDLY_URL` | Vercel Config | Optional. Without it, `/1-1` uses WhatsApp |

Do not put `NEXT_PUBLIC_CONVEX_URL` in Secret — Vercel will warn because `NEXT_PUBLIC_` is exposed to the browser.

Convex dashboard: [pinkys-up](https://dashboard.convex.dev/t/connor-barrett/pinkys-up)

## Shipping

GitHub default branch is `main`. Vercel deploys that automatically.

Say **ship it** to commit and push. Do not force-push. Do not run `npx convex deploy` unless we are intentionally updating the production Convex backend (functions already live there).

After a Convex function change: `npm run convex:dev` locally, then deploy Convex to prod when that backend change should go live.

## Stack

- Next.js 16 (App Router) on Vercel
- Convex for quotes and community events
- Resend for quote email
- Tailwind + Framer Motion
- Vercel Analytics + Speed Insights (Hobby: page views only, no custom events)

## Brand

- Name is **PINKYS UP** (no “DC” in the wordmark)
- Instagram / TikTok: `pinkysup_dc`
- Cities: Washington, DC and Minneapolis
- Don’t invent Eventbrite URLs, Calendly links, fake events, or political drink names

## Contact

- WhatsApp: [+1 571 501 4766](https://wa.me/15715014766)
- Instagram: [@pinkysup_dc](https://instagram.com/pinkysup_dc)
- TikTok: [@pinkysup_dc](https://tiktok.com/@pinkysup_dc)
