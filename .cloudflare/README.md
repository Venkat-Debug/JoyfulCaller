# Cloudflare Pages Deployment Guide

## Quick Start

1. **Connect Repository to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages → Create a project
   - Connect your Git repository (GitHub, GitLab, or Bitbucket)
   - Select your repository: `Venkat-Debug/JoyfulCaller`

2. **Build Configuration:**
   In the Cloudflare Pages build settings, configure:
   
   - **Build command:** `npm run build`
   - **Output directory:** `dist` (this is the ONLY output directory field)
   - **Root directory:** `/` (leave empty or enter `/` - this is the repository root)
   
   **Important:** There is only ONE output directory field in Cloudflare Pages. Enter `dist` in that field.

3. **Environment Variables (if needed):**
   - Add any required environment variables in the Cloudflare Pages dashboard
   - Under Settings → Environment Variables

4. **Deploy:**
   - Cloudflare Pages will automatically deploy on every push to your main branch
   - Preview deployments are created for pull requests

## Local Development with Wrangler

To test locally with Cloudflare Pages:

```bash
# Install Wrangler CLI (if not already installed)
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Preview locally
wrangler pages dev dist
```

## SPA Routing

This project uses:
- `public/_redirects` file for SPA routing

The `_redirects` file ensures that all routes are handled by `index.html` for client-side routing. This file is automatically copied to the `dist` directory during the build process.

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/platform/functions/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

