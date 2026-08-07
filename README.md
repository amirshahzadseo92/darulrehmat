# Cloudflare Build Fix & Deployment Guide for darulrehmat

## Screenshot Error Cause (Ghalti ki Wajah)
In your Cloudflare dashboard screenshot, the build error occurred because:
1. **Build command** was set to `None` in Cloudflare settings.
2. Cloudflare ran `npx wrangler deploy` directly without compiling Next.js into the `./out` folder first.

---

## 🛠️ Solutions Applied in Code

1. **Auto-Build in `wrangler.json`**:
   We added `"build": { "command": "npm run build" }` inside `wrangler.json`. Now when Cloudflare runs `npx wrangler deploy`, Wrangler automatically executes `npm run build` first to compile static HTML/CSS/JS into `./out`.

2. **Next.js Static Export Configured**:
   `next.config.ts` has `output: 'export'` and `images.unoptimized: true`.

---

## ⚙️ Recommended Cloudflare Dashboard Settings

In your Cloudflare Dashboard under **Workers & Pages** -> **darulrehmat** -> **Settings** -> **Builds & deployments**:

- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Framework preset**: `Next.js (Static Export)`
- **Node.js Version**: `20` (under Environment Variables set `NODE_VERSION` = `20` if needed)

Click **"Retry build"** in Cloudflare, and your site will deploy successfully!
