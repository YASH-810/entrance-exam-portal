import { cookies } from "next/headers";
import { authAdmin } from "@/lib/firebase-admin";
import { redirect } from "next/navigation";

export default async function FacultyLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;


    if (!token) redirect("/auth/login");

    let decoded;
    try {
        decoded = await authAdmin.verifyIdToken(token);
    } catch {
        redirect("/auth/login");
    }

    if (decoded.role !== "faculty") redirect("/unauthorized");

    return <>{children}</>;
}
