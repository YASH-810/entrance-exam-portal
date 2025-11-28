import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("🔥 PROXY:", path);

  // Allow public routes
  if (
    path.startsWith("/auth") ||
    path.startsWith("/_next") ||
    path.startsWith("/public") ||
    path === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Protect these routes
  const protectedRoutes = ["/dashboard", "/exam"];
  const mustProtect = protectedRoutes.some((r) => path.startsWith(r));

  if (!mustProtect) return NextResponse.next();

  // Read cookies
  const token = request.cookies.get("token")?.value;

  if (!token) {
    console.log("❌ No token, redirecting...");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // 🚫 DO NOT verify token inside proxy — Edge runtime does not support Firebase Admin
  // The API will verify the token and enforce the correct role.

  return NextResponse.next();
}

// Apply to these routes
export const config = {
  matcher: ["/dashboard/:path*", "/exam/:path*"],
};
