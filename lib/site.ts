// Site-wide settings read from environment variables (Vercel → Project → Settings → Environment Variables).

/** Public URL of the site, used for WhatsApp/Google link previews. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')

/** Keep the demo out of Google until the owner approves it. Set NEXT_PUBLIC_ALLOW_INDEXING=true to go live. */
export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
