import { NextResponse } from "next/server";

export function proxy(req) {
  const url = new URL(req.url);

  // Parse token from cookies
  const cookieHeader = req.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;

  // If no token and not already on /login
  if (!token && !url.pathname.startsWith("/login")) {
    // Redirect to /login with original URL as query param
    const loginUrl = new URL("/login", url.origin);
    loginUrl.searchParams.set("redirectTo", url.pathname + url.search);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, proceed normally
  return NextResponse.next();
}

export const config = {
  matcher: ["/delta/:path*"], // Protect /delta and all subpaths
};
