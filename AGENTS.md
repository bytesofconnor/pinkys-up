<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

For non-trivial tasks, work under `/poteto-mode` and use the model mapping in `.cursor/rules/pstack-models.mdc`.

## CI and pull requests

PRs against `main` use `.github/pull_request_template.md` (**Verification** and **Blast Radius**). PR bodies need Summary, Verification, Blast Radius headings (checked in CI; Dependabot exempt). Mark `CI / checks` required: lint, `tsc --noEmit`, `next build`, and Playwright smoke on `/`, `/events`, `/mocktails`, `/quote`, `/about` at 1280×800 and 390×844. Do not skip tests or disable lint to go green. Same-repo PRs squash-merge after `CI / checks`. That includes Cursor `cursor/*` branches, every Dependabot update (patch, minor, major, and GitHub Actions), and PRs that change `.github/**`, `.cursor/rules/**`, or `AGENTS.md`. Forks stay manual. Convex deploys from `main` when `convex/**` changes (`CONVEX_DEPLOY_KEY`), including after a `GITHUB_TOKEN` squash. Those merges do not start `push` workflows.

## Vercel builds

Hobby builds are limited. `vercel.json` runs `bash scripts/vercel-ignore-build.sh` from the repository root. Exit 0 skips the build. Exit 1 runs it.

Skip preview builds whose branch starts with `dependabot/` or `cursor/`. A production build still runs, including on those branch names, when the commit changes the app. Skip the build when the commit does not change the app root. If the parent commit is missing, the build runs.

Dependabot opens one npm pull request and one GitHub Actions pull request each week. Those groups include major updates.
