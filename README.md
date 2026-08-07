# Cloudflare Pages / Workers Deployment Settings

In your Cloudflare Dashboard for **darulrehmat**, update the build settings as follows:

## Cloudflare Dashboard Settings

Go to **Workers & Pages** -> **darulrehmat** -> **Settings** -> **Build & deployments**:

1. **Build command**: `npm run build`
2. **Build output directory**: `out`
3. **Framework preset**: `Next.js (Static Export)` or `None`

---

## Why the build failed in the screenshot
In your Cloudflare dashboard, the **Build command** was set to `None`, so Cloudflare tried to deploy using `npx wrangler deploy` before Next.js compiled the site into the `out` folder.

Setting **Build command** to `npm run build` fixes this issue completely!
