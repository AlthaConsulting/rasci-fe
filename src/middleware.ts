import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = [
  "/login",
  "/register",
  "/forget-password",
  "/account/email-verification",
  "/account/password-reset",
];

const PROTECTED_ROUTES = ["/account/multi-factor-authentication"];

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const token = cookies.get(process.env.AUTH_JWT_COOKIE!);

  if (AUTH_ROUTES.includes(request.nextUrl.pathname)) {
    if (token) return NextResponse.redirect(new URL("/", request.url));
    return NextResponse.next();
  }

  if (PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
    if (!token) return NextResponse.redirect(new URL("/login", request.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets/.*|images/.*|.*\\..*$).*)",
  ],
};
