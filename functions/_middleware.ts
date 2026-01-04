/**
 * Cloudflare Pages Middleware for SPA routing
 * This ensures all routes are handled by index.html for client-side routing
 */
export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  
  // If the request is for a file with an extension, serve it directly
  if (url.pathname.includes('.')) {
    return context.next();
  }
  
  // Otherwise, serve index.html for SPA routing
  return context.rewrite('/index.html');
}

