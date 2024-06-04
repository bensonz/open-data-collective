import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/home(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (image files)
     * - icons (icon files)
     * - audio (audio files)
     * - locales (locales files)
     * - sw.js (service worker)
     * - public (public routes)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|audio|locales|sw.js|public|robots.txt|sitemap.xml).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
