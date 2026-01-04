# Joyful Caller - Tambola Number Caller

A playful and interactive React web app for calling Tambola (Bingo) numbers with joy! Features voice calling, slang mode, bento board zones, and TV broadcast mode.

## Features

- 🎯 **Interactive Number Picker** - Click to pick random Tambola numbers
- 🎨 **Beautiful UI** - Modern, playful design with smooth animations
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 🔊 **Voice Calling** - Clear cadence for family games
- 🎭 **Slang Mode** - Classic Tambola fun lines
- 📱 **Responsive Design** - Works on all devices
- ⚡ **Real-time Animations** - Smooth, interactive elements

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Cloudflare (Workers UI / Wrangler Deploy)

If you are using the Cloudflare build screen that has a **Deploy command** (e.g. `npx wrangler deploy`), deploy it as a Worker with static assets:

1. **Connect Repository:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Workers**
   - Connect your Git repository (GitHub, GitLab, or Bitbucket)

2. **Build Settings:**
   In the Cloudflare build settings screen you shared:
   - **Build command (optional):** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Path:** `/`

3. **Deploy:**
   - Deployments will run on pushes to your configured branch in Cloudflare

4. **Local Testing with Wrangler:**
   ```bash
   # Install Wrangler CLI (if not already installed)
   npm install -g wrangler
   
   # Login to Cloudflare
   wrangler login
   
   # Run the same flow as Cloudflare deploy
   npm run workers:dev
   ```

### Netlify

This project also supports Netlify deployment (see `netlify.toml` for configuration).

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Material Icons** - Icon library

## Project Structure

```
JoyfulCaller/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   └── Features.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Interactive Features

- **Logo Icon** - Click to scroll to top, hover to spin
- **Navbar Links** - Smooth scroll to sections
- **Dark Mode Toggle** - Switch themes instantly
- **Play Now Button** - Starts number picking animation
- **Watch Demo Button** - Auto-picks numbers for demo
- **Star & Sparkle Icons** - Click to pick numbers
- **Floating Number Cards** - Click to set that number
- **Feature Cards** - Hover and click for animations
- **Pick Button** - Generates random Tambola numbers

## License

MIT



