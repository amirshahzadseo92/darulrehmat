# Cloudflare Pages Deployment Guide (Via GitHub)

Is project ko **GitHub** ke zariye **Cloudflare Pages** par deploy karne ke liye ye settings use karein:

## 1. Cloudflare Pages Dashboard Settings

When creating a new Cloudflare Pages project from your GitHub repository:

- **Framework preset**: `Next.js (Static Export)` ya `None`
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Root directory**: `/` (leave empty or `/`)

## 2. Environment Variables (Environment Variables in Cloudflare)

Cloudflare Pages settings me **Environment Variables** section me ye add kar sakte hain (optional):

- `NODE_VERSION`: `20`

## 3. Deployment Summary

- Project configured for Next.js **Static Export** (`output: 'export'`)
- Image Optimization configured as `unoptimized: true` for zero-error static hosting.
- `.node-version` file included to enforce Node 20 runtime on Cloudflare build servers.
