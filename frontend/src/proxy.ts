import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
export const runtime = "edge";
export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("🔥 PROXY:", path);

  // Public routes allowed
  if (
    path.startsWith("/auth") ||
    path.startsWith("/_next") ||
    path.startsWith("/public") ||
    path === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Routes that need authentication
  const protectedRoutes = ["/dashboard", "/exam"];
  const mustProtect = protectedRoutes.some((r) => path.startsWith(r));

  if (!mustProtect) return NextResponse.next();

  // Read cookies
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  if (!token || !role) {
    console.log("❌ No token OR role cookie, redirecting...");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  console.log("Role from cookie:", role);

  // Role enforcement
  if (path.startsWith("/dashboard/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/dashboard/faculty") && role !== "faculty") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/dashboard/student") && role !== "student") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/exam") && role !== "student") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/exam/:path*"],
};
