# Cloudflare Deployment Guide (Workers UI)

## Quick Deployment Steps

### 1. Connect Your Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** → **Workers** (the UI with Deploy command)
3. Connect your Git repository (GitHub/GitLab/Bitbucket)
4. Select your repository: `Venkat-Debug/JoyfulCaller`

### 2. Configure Build Settings

In the Cloudflare build settings screen you shared, set:

**Build command (optional):**
```
npm run build
```

**Deploy command:**
```
npx wrangler deploy
```

**Path:**
```
/
```

### 3. Deploy

- Click **Save and Deploy**
- Cloudflare will automatically:
  - Install dependencies
  - Run the build command (`npm run build`)
  - Deploy the Worker (`npx wrangler deploy`)

### 4. Your Site is Live!

Once deployed, you’ll get a `*.workers.dev` URL (or your custom domain if you attach one).

## SPA Routing

This repo includes a Worker (`src/worker.ts`) configured via `wrangler.toml` to serve the Vite `dist/` output as static assets **with SPA fallback** to `/index.html`.

## Troubleshooting

If deployment fails:
1. Check the build logs in Cloudflare dashboard
2. Ensure `package.json` has the correct build script: `"build": "vite build"`
3. Verify Node.js version (Cloudflare uses Node.js 18+ by default)

## Local Testing

Test your build locally before deploying:

```bash
# Run the same flow as Cloudflare Workers deploy
npm run workers:dev
```

This will show you exactly what Cloudflare Workers will deploy.

