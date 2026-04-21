import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add paths that require authentication here
// Temporarily disabled for local UI testing
const protectedPaths: string[] = [];

export async function middleware(req: NextRequest) {
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const token = req.cookies.get("accessToken")?.value;
    
    // In Edge middleware, we just check for presence. 
    // The actual cryptographic verification happens in the Node.js API routes.
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes are protected individually)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
