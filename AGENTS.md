<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md

## Commands

- `npm run dev` — dev server (Next.js 16, Turbopack) at http://localhost:3000
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — bare `eslint` over the repo (flat config). Scope it with `npm run lint -- src/app/page.tsx`
- Typecheck: `npx tsc --noEmit` (no dedicated script)
- No test runner is configured (no `test` script, no single-test command).

## Project shape

- Next.js 16.4.3 App Router, React 19, Tailwind CSS v4. Four routes: `/` (marketing page), `/add-destination` (form that POSTs to the API), `/all-destinations` (fetched listing with filters), and `/all-destinations/[id]` (fetched detail page).
- Root layout (`src/app/layout.tsx`) renders `Navbar` and `Footer` on every route. Pages should render their own `<main>` and must not repeat those.
- Home (`src/app/page.tsx`) composes `Banner`, `WhyChoose`, `Testimonials`, `TravelCTA` from `src/components/`. Shared primitives live in `src/components/ui/` (shadcn "base-nova" style, built on Base UI + `class-variance-authority`).
- Destination types, the `DESTINATIONS_API` base URL, price ranges, formatting, and filter/sort logic live in `src/lib/destinations.ts`. `/all-destinations` filters via URL params (`category`, `price`, `sort`) through the client `DestinationFilters` component; cards link to `/all-destinations/[id]`.
- `@/*` maps to `src/*`; shadcn aliases are in `components.json`. Add primitives with `npx shadcn@latest add <name>`.
- `src/lib/utils.ts` re-exports `cn` from the `cn` npm package — not `clsx` + `tailwind-merge`.

## Conventions and quirks

- `next.config.ts` enables `reactCompiler` plus a Turbopack Tailwind loader, and sets `images.remotePatterns` to any http(s) host because destination image URLs are user-supplied. Read it before changing Next, images, or styling behavior.
- The backend API is hardcoded at `http://localhost:5000` (`GET /destinations`, `POST /add-destination`); there is no env var. `/all-destinations` is dynamic (`cache: "no-store"`), so `npm run build` works offline but serving that page requires the API.
- Typed Routes are generated and consumed through global `PageProps` / `LayoutProps` types (e.g. `LayoutProps<"/">`); generated under `.next/types`. Prefer them over hand-written route params.
- Server components by default. Add `"use client"` only for state, events, or browser APIs.
- Tailwind v4 is configured in CSS (`@theme` / variables in `src/app/globals.css`), not a JS config. Use existing tokens.
- Display headings use the global Josefin Sans with `font-light tracking-[-0.065em]`; follow existing section headers instead of introducing new fonts.
- Primary accent is `#1598ff` (see `WhyChoose.tsx`). Section decoration pattern: 18×2px accent bars centered top/bottom plus 2×19px bars at the sides.
- Icons come from `lucide-react`; section artwork is static PNGs under `public/images/`.
- `next/image`: Next 16 uses `preload`; `priority` is deprecated (still present in `Navbar.tsx` — don't copy it).
- Brand is "Wanderlast" (metadata/nav/footer), but "Wanderlust" appears in the `WhyChoose` heading and package name. Don't mass-rename either.

## Status

- No tests, CI workflows (`.github/` only holds `copilot-instructions.md`), pre-commit hooks, formatter, or env vars. `.env*` is gitignored.
- `.github/copilot-instructions.md` mirrors this file — keep both in sync.
