# Restaurant Website

Next.js site for a restaurant: home, menu, banquets and contact. Table bookings, takeaway orders and banquet enquiries are sent over WhatsApp. No backend, no database, no payments.

## Tech

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4, Framer Motion
- Self-hosted fonts via `@fontsource/*`

## Setup

Requires Node.js 20.9+ and pnpm.

```bash
pnpm install
pnpm dev         # http://localhost:3000
pnpm build       # production build
pnpm start       # serve the build
pnpm typecheck   # type check only
```

## Structure

```
app/          pages (home, menu, banquets), layout, robots, sitemap, global styles
components/   page sections and UI components
data/         all site content (restaurant.ts)
lib/          site config and utilities
public/       images
```

## Content

All content is in `data/restaurant.ts`: contact details, WhatsApp number, address, hours, menu, venues, packages and photos.

Images are in `public/images/`. To replace one, keep the same file name.

## Environment variables

| Name | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_ALLOW_INDEXING` | `false` | Set `true` to allow search engine indexing |
| `NEXT_PUBLIC_SITE_URL` | Vercel URL | Base URL for metadata and link previews |

`NEXT_PUBLIC_*` values are applied at build time, so rebuild after changing them.

## Deploy

Push to GitHub and import the repo on Vercel with the default Next.js settings. Each push to `main` redeploys.
