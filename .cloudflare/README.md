# Cloudflare Deployment Guide (Workers UI)

## Quick Start

1. **Connect Repository in Cloudflare Workers:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Workers**
   - Connect your Git repository (GitHub, GitLab, or Bitbucket)
   - Select your repository: `Venkat-Debug/JoyfulCaller`

2. **Build Configuration:**
   In the Cloudflare Pages build settings, configure:
   
   - **Build command (optional):** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Path:** `/` (repository root)
   
   **Important:** In this Workers UI, there is no separate “output directory” field — the Worker serves static assets from `dist/` via `wrangler.toml`.

3. **Environment Variables (if needed):**
   - Add any required environment variables in the Cloudflare Pages dashboard
   - Under Settings → Environment Variables

4. **Deploy:**
   - Cloudflare Pages will automatically deploy on every push to your main branch
   - Preview deployments are created for pull requests

## Local Development with Wrangler

To test locally with the same Worker setup:

```bash
# Install Wrangler CLI (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Run the same flow as Cloudflare deploy
npm run workers:dev
```

## SPA Routing

This project uses a Worker (`src/worker.ts`) that serves `dist/` and falls back to `/index.html` for client-side routes.

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

