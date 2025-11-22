import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;

  const protectedRoutes = ["/dashboard", "/posts/create", "/posts/edit"];

  if (protectedRoutes.some((r) => req.nextUrl.pathname.startsWith(r))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/posts/:path*"],
};

