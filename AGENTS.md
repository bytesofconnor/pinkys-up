<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## CI and pull requests

PRs against `main` use `.github/pull_request_template.md` (**Verification** and **Blast Radius**). Mark `CI / checks` required: lint, `tsc --noEmit`, `next build`, and Playwright smoke on `/`, `/events`, `/mocktails`, `/quote`, `/about` at 1280×800 and 390×844. Do not skip tests or disable lint to go green. Dependabot patch/minor PRs auto-merge after that check; majors stay manual. Convex deploys from `main` when `convex/**` changes (`CONVEX_DEPLOY_KEY`).
