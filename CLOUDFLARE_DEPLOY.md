# Cloudflare Pages Deployment Guide

## Quick Deployment Steps

### 1. Connect Your Repository

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Connect your Git repository (GitHub/GitLab/Bitbucket)
4. Select your repository: `Venkat-Debug/JoyfulCaller`

### 2. Configure Build Settings

In the Cloudflare Pages build settings, you'll see these fields:

**Build command:**
```
npm run build
```

**Output directory:**
```
dist
```

**Root directory:**
```
/
```
(Leave empty or enter `/` - this is your repository root)

### 3. Deploy

- Click **Save and Deploy**
- Cloudflare Pages will automatically:
  - Install dependencies (`npm install`)
  - Run the build command (`npm run build`)
  - Deploy files from the `dist` directory
  - Set up automatic deployments on every push to your main branch

### 4. Your Site is Live!

Once deployed, you'll get a URL like: `https://joyful-caller.pages.dev`

## Automatic Deployments

- **Production**: Every push to `main` branch triggers a new deployment
- **Preview**: Pull requests get preview deployments automatically

## SPA Routing

The `public/_redirects` file is automatically included in your build and handles client-side routing. All routes will serve `index.html` for your React app.

## Troubleshooting

If deployment fails:
1. Check the build logs in Cloudflare Pages dashboard
2. Ensure `package.json` has the correct build script: `"build": "vite build"`
3. Verify Node.js version (Cloudflare Pages uses Node.js 18+ by default)

## Local Testing

Test your build locally before deploying:

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

This will show you exactly what Cloudflare Pages will deploy.

