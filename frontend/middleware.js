import { NextResponse } from "next/server";

export function middleware(request) {
  const accessToken =
    request.cookies.get("accessToken");

  if (
    !accessToken &&
    (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/projects")
    )
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
  ],
};