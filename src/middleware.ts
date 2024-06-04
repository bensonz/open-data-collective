import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  return NextResponse.next();
}

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
  ],
};
