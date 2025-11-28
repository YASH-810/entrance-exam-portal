"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserCog,
  FileEdit,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Students", href: "/dashboard/admin/students", icon: Users },
  { name: "Faculty", href: "/dashboard/admin/faculty", icon: UserCog },
  { name: "Exams", href: "/dashboard/admin/exams", icon: FileEdit },
  { name: "Results", href: "/dashboard/admin/results", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r h-screen fixed left-0 top-0 p-4">
      <div className="text-2xl font-bold mb-8">Admin Panel</div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
