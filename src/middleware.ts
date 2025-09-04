import { cookies } from "next/headers";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const cookie = await cookies();

  const token = cookie.get("auth-token")?.value;

  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    "/dashboard",
    "/tickets",
    "/smart-finance",
    "/reports",
  ];

  const isProtectedRoute = protectedRoutes.some((r) => pathname.startsWith(r));

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    "/dashboard/:path*",
    "/tickets/:path*",
    "/smart-finance/:path*",
    "/reports/:path*",
  ],
};
