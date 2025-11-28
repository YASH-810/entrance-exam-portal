"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const res = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
              reject(data.error || "Invalid credentials.");
              return;
            }

            // redirect based on role
            if (data.role === "admin") router.push("/dashboard/admin");
            else if (data.role === "faculty") router.push("/dashboard/faculty");
            else if (data.role === "student") router.push("/dashboard/student");
            else reject("Unknown role.");

            resolve("success");
          } catch (err) {
            reject("Something went wrong.");
          }
        }),
        {
          loading: "Logging in...",
          success: "Login successful!",
          error: (msg) => msg,
        }
      );
    },
    [email, password, router]
  );

  return (
    <div className="
      min-h-screen px-4 py-12 grid place-items-center 
      bg-linear-to-br from-indigo-50 via-sky-50 to-teal-50 
      dark:from-indigo-950 dark:via-slate-950 dark:to-teal-950
    ">
      <div className="w-full max-w-md">
        <Card className="rounded-3xl bg-white/90 text-foreground backdrop-blur shadow-xl border">
          <CardContent className="p-8">
            
            <div className="text-center space-y-3">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">Entrance Exam</h1>
              <p className="text-sm text-muted-foreground">Empowering Students to Succeed</p>
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full h-11 font-semibold">
                Login
              </Button>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <Link href="/auth/register" className="hover:underline">
                  Register
                </Link>
                <Link href="/auth/forgot-password" className="hover:underline">
                  Forgot Password?
                </Link>
              </div>

            </form>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
