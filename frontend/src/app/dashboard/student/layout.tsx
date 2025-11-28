import { cookies } from "next/headers";
import { authAdmin } from "@/lib/firebase-admin";
import { redirect } from "next/navigation";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ⬅️ FIX: MUST await cookies()
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/auth/login");

  let decoded;
  try {
    decoded = await authAdmin.verifyIdToken(token);
  } catch {
    redirect("/auth/login");
  }

  if (decoded.role !== "student") redirect("/unauthorized");

  return <>{children}</>;
}
