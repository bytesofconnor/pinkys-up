# Ops

Where PINKYS UP lives, and which env vars belong where. Do not put secrets in this file.

Next and the Convex CLI both use the repo-root **`.env.local`**. Template: [`.env.example`](.env.example).

**Live:** https://www.pinkysup.social  
**Admin:** https://www.pinkysup.social/admin (Insights, Events, Quotes)

## Dashboards

| What | URL |
| --- | --- |
| Site | https://www.pinkysup.social |
| GitHub | https://github.com/bytesofconnor/pinkys-up |
| Vercel project | https://vercel.com/connors-projects-408eaae2/pinkys-up |
| Vercel env | https://vercel.com/connors-projects-408eaae2/pinkys-up/settings/environment-variables |
| Vercel domains | https://vercel.com/connors-projects-408eaae2/pinkys-up/settings/domains |
| Vercel Analytics | https://vercel.com/connors-projects-408eaae2/pinkys-up/analytics |
| Convex project | https://dashboard.convex.dev/t/connor-barrett/pinkys-up |
| Convex **dev** | https://dashboard.convex.dev/d/beaming-stingray-557 |
| Convex **prod** | https://dashboard.convex.dev/d/cautious-sheep-629 |
| Convex env | Dashboard → deployment → Settings → Environment Variables. Or `npx convex env list` / `npx convex env set NAME` (`--prod` for live) |
| Resend | https://resend.com/emails |
| Resend API keys | https://resend.com/api-keys |
| Resend domain | https://resend.com/domains (`pinkysup.social`) |
| Quote inbox (Gmail) | `pinkysup.social@gmail.com` |
| DNS | Squarespace (Google Domains nameservers), not Vercel. Site `A @` → Vercel, `CNAME www` → `cname.vercel-dns.com`. DKIM/CNAME for Resend also live here |

No GitHub Actions. No Stripe. `/1-1` is Calendly if `NEXT_PUBLIC_CALENDLY_URL` is set, otherwise WhatsApp.

Local shortcuts:

```bash
npx convex dashboard
npx convex env list          # dev
npx convex env list --prod
npm run convex:dev           # functions + schema; writes Convex URLs into .env.local
npm run dev                  # Next.js
```

## Variables

Same names, different places. After a value changes, update every column that has a check.

| Variable | `.env.local` | Convex env | Vercel | Notes |
| --- | --- | --- | --- | --- |
| `CONVEX_DEPLOYMENT` | yes | | | CLI only. Dev: `dev:beaming-stingray-557`. `npx convex dev` maintains this. |
| `NEXT_PUBLIC_CONVEX_URL` | yes | | **Config** (not Secret) | Dev: `https://beaming-stingray-557.convex.cloud`. Prod: `https://cautious-sheep-629.convex.cloud`. |
| `NEXT_PUBLIC_CONVEX_SITE_URL` | yes | | | Written by `npx convex dev`. App does not read it. |
| `ADMIN_TOKEN` | yes | **dev and prod** | **Secret** | `/admin` access code. Next and Convex must match **on that environment**. Local/dev can differ from prod. |
| `RESEND_API_KEY` | if testing email | | **Secret** | Connor’s Resend account. |
| `RESEND_FROM_EMAIL` | if testing email | | Config | `PINKYS UP <hello@pinkysup.social>` (verified domain). Fallback: `Pinkys Up <onboarding@resend.dev>`. |
| `QUOTE_NOTIFICATION_EMAIL` | yes | | Config | `pinkysup.social@gmail.com`. Fallback in code is Brenda’s personal Gmail. |
| `SEND_GUEST_CONFIRMATION` | optional | | optional | `true` emails the guest a copy. Off by default. |
| `NEXT_PUBLIC_CALENDLY_URL` | optional | | Config | Optional. Without it, `/1-1` uses WhatsApp. |

Do not put `NEXT_PUBLIC_*` in Vercel Secret.

A Cursor/shell `ADMIN_TOKEN` overrides `.env.local` unless Next loads the local value (see `next.config.ts`). Prefer unsetting the shell var, or keep `.env.local` as the local source of truth.

## Who owns what

- **Quotes and events** — Convex tables `quoteSubmissions` and `communityEvents` on the deployment Next points at.
- **Quote email** — Resend → `pinkysup.social@gmail.com`. Domain DNS is Squarespace. Resend receiving is off; Gmail is the inbox.
- **Admin access** — `ADMIN_TOKEN` cookie after `/admin` login.
- **Brenda-facing stats** — Convex `siteEvents`, shown at `/admin/insights`. Last 30 days, from when tracking went live.
- **Vercel Analytics / Speed Insights** — pageviews in the Vercel dashboard (Hobby). Custom event breakdowns need Pro; we do not rely on that for admin.
- **Site hosting** — Vercel, `main` auto-deploys. DNS stays on Squarespace.

## Discoverability (not in this repo)

Traffic still depends on listings ChatGPT and Google already trust:

- Google Business Profile for DC and Minneapolis (mobile bar / event service; no alcohol)
- Google Search Console + Bing Webmaster (sitemap: `https://www.pinkysup.social/sitemap.xml`)
- NAP matches the site: PINKYS UP, DC + Minneapolis, WhatsApp `+1 571 501 4766`, Instagram/TikTok `pinkysup_dc`

On-site: `/faq`, `/washington-dc`, `/minneapolis`, `/llms.txt`.

## Shipping

GitHub default is `main`. Vercel deploys that.

Say **ship it** to commit and push. Do not force-push.

`npx convex deploy` is **production Convex only** (schema + functions). Use it when backend files under `convex/` should go live. Next-only changes do not need it. Local backend work: `npm run convex:dev`, never `deploy`.
