# Project Guidelines

## Build, lint, and tests

- `npm run dev` starts the development server.
- `npm run build` creates a production build; `npm start` serves it.
- `npm run lint` runs ESLint. To lint one file, use `npm run lint -- src/app/page.tsx` (replace the path as needed).
- `npx tsc --noEmit` typechecks the project.
- There is currently no test script or test runner configured, so there is no single-test command.

## Architecture

- This is a Next.js 16 App Router application. Routes and the root layout live under `src/app`; `src/app/layout.tsx` loads global styles and fonts and renders `Navbar`/`Footer` on every route, while `src/app/globals.css` defines the Tailwind theme and shared design tokens.
- There are four routes: `/` (marketing page composed from `src/components`), `/add-destination` (form that POSTs to the API), `/all-destinations` (listing fetched from the API with URL-based filters), and `/all-destinations/[id]` (detail page fetched by id, linked from the cards).
- Shared UI primitives live in `src/components/ui` (shadcn "base-nova" style). Buttons are built on Base UI and use class-variance-authority for variants; cards are composed from native elements.
- Static assets are served from `public/` (for example, `public/images/`).
- `@/*` resolves to `src/*`. The component aliases are also declared in `components.json`.

## Repository conventions

- Components are server components by default. Add a `"use client"` boundary only for components that need client-side state, event handling, or browser APIs.
- Tailwind CSS 4 is configured through CSS imports and theme variables in `src/app/globals.css`, not a Tailwind JavaScript config. Prefer the existing theme tokens and utility classes when styling.
- The primary accent is `#1598ff`, and section decorations follow the accent-bar pattern in `src/components/WhyChoose.tsx`. Display headings use Josefin Sans with `font-light tracking-[-0.065em]`.
- Next.js 16 uses `preload` on `next/image`; `priority` is deprecated (still present in `Navbar.tsx`).
- The backend base URL comes from `BASE_API_URL` in `.env`, mirrored as `NEXT_PUBLIC_BASE_API_URL` for client components; `src/lib/api.ts` normalizes both and falls back to `http://localhost:5000`. Because destination images are user-supplied, `next.config.ts` allows any http(s) host in `images.remotePatterns`.
- UI primitives combine `class-variance-authority` variants with the `cn` class helper; follow the patterns in `src/components/ui/button.tsx` and `src/components/ui/card.tsx`. `cn` comes from the `cn` npm package via `src/lib/utils.ts`.
- The root `AGENTS.md` contains a Next.js-specific requirement: before changing Next.js code, read the relevant guide under `node_modules/next/dist/docs/` and follow its version-specific guidance.
