import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();

  const token = req.cookies.get("token");

  if (!token && !url.pathname.startsWith("/login")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/delta"],
};
