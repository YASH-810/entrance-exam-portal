import { authAdmin } from "./src/lib/firebase-admin";

export async function handler(request: Request, context: any) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  console.log("🔥 PROXY RUNNING:", pathname);

  // Allow public routes
  if (
    pathname.startsWith("/auth") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/public") ||
    pathname === "/favicon.ico"
  ) {
    return;
  }

  // Routes requiring login
  const protectedRoutes = ["/dashboard", "/exam"];

  const mustProtect = protectedRoutes.some((r) =>
    pathname.startsWith(r)
  );

  if (!mustProtect) return;

  // Read cookie
  const token = context.cookies.get("token")?.value;

  if (!token) {
    console.log("❌ No token, redirecting to login");
    return Response.redirect(new URL("/auth/login", request.url));
  }

  let decoded;
  try {
    decoded = await authAdmin.verifyIdToken(token);
  } catch (err) {
    console.log("❌ Invalid token:", err);
    return Response.redirect(new URL("/auth/login", request.url));
  }

  const role = decoded.role;
  console.log("👤 ROLE:", role);

  // ===== ROLE RESTRICTIONS =====

  // Admin only
  if (pathname.startsWith("/dashboard/admin") && role !== "admin")
    return Response.redirect(new URL("/unauthorized", request.url));

  // Faculty only
  if (pathname.startsWith("/dashboard/faculty") && role !== "faculty")
    return Response.redirect(new URL("/unauthorized", request.url));

  // Student dashboard only
  if (pathname.startsWith("/dashboard/student") && role !== "student")
    return Response.redirect(new URL("/unauthorized", request.url));

  // Student exam only
  if (pathname.startsWith("/exam") && role !== "student")
    return Response.redirect(new URL("/unauthorized", request.url));

  // allow
  return;
}
