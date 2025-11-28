"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-muted/30">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Unauthorized Access
      </h1>

      <p className="text-lg text-gray-700 max-w-md mb-6">
        You do not have permission to view this page.
      </p>

      <Button onClick={() => router.push("/auth/login")} className="px-6">
        Go to Login
      </Button>
    </div>
  );
}
