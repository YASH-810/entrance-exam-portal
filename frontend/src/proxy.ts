// proxy.ts (ROOT FOLDER)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("🔥 PROXY:", path);

  // -------------------------
  // PUBLIC ROUTES (no block)
  // -------------------------
  if (
    path.startsWith("/auth") ||
    path.startsWith("/_next") ||
    path.startsWith("/favicon.ico") ||
    path.startsWith("/public")
  ) {
    return NextResponse.next();
  }

  // -------------------------
  // PROTECTED ROUTES
  // -------------------------
  const isProtected =
    path.startsWith("/dashboard") || path.startsWith("/exam");

  if (!isProtected) return NextResponse.next();

  // Read cookies
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  // No login → redirect
  if (!token) {
    console.log("❌ Missing token → Go to login");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // -------------------------
  // ROLE PROTECTION
  // -------------------------
  if (path.startsWith("/dashboard/admin") && role !== "admin") {
    console.log("❌ PROXY BLOCKED → Not admin");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/dashboard/faculty") && role !== "faculty") {
    console.log("❌ PROXY BLOCKED → Not faculty");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/dashboard/student") && role !== "student") {
    console.log("❌ PROXY BLOCKED → Not student");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/exam") && role !== "student") {
    console.log("❌ PROXY BLOCKED → Exam requires student role");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // Allow access
  return NextResponse.next();
}

// Apply to these routes
export const config = {
  matcher: ["/dashboard/:path*", "/exam/:path*"],
};
