import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  // Redirect /auth/signup to /auth/sign-up
  if (pathname === "/auth/signup") {
    return NextResponse.redirect(new URL("/auth/sign-up", req.url));
  }

  if (!token && !pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /_next (Next.js internals)
     * - /api (API routes)
     * - /auth (Login and registration pages)
     */
    "/((?!_next|api|auth).*)",
    "/auth/signup",

  ],
};
