"use client";

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/auth/login");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Top Bar + Content */}
      <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
        
        {/* TOP BAR */}
        <div className="h-16 flex items-center justify-between px-8 border-b bg-white">
          <h1 className="text-xl font-semibold">Admin Panel</h1>

          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
