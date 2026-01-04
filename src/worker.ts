/**
 * Cloudflare Worker entrypoint that serves the built SPA from `dist/`.
 *
 * - Static assets are served via `env.ASSETS.fetch(request)`
 * - For non-asset routes (e.g. /game, /tv, /settings), we return `/index.html`
 *   so React Router (or any client-side router) can handle navigation.
 */
export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // Try serving the requested asset first.
    const res = await env.ASSETS.fetch(request);
    if (res.status !== 404) return res;

    // If this looks like a direct asset request (has an extension), keep the 404.
    // Example: /assets/app-XYZ.js, /favicon.ico
    if (url.pathname.includes(".")) return res;

    // SPA fallback: serve index.html for client-side routes.
    const accept = request.headers.get("Accept") || "";
    if (!accept.includes("text/html") && !accept.includes("*/*")) return res;

    const indexReq = new Request(new URL("/index.html", url.origin), {
      method: "GET",
      headers: request.headers,
    });

    return env.ASSETS.fetch(indexReq);
  },
};


