"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleReset = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const res = await fetch("/api/auth/forgot-password", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
              reject(data.error || "Failed to send reset email.");
              return;
            }

            resolve("success");
          } catch (err) {
            reject("Something went wrong.");
          }
        }),
        {
          loading: "Sending password reset email...",
          success: "Reset email sent! Check your inbox.",
          error: (msg) => msg,
        }
      );
    },
    [email]
  );

  return (
    <div className="min-h-screen px-4 py-12 grid place-items-center bg-linear-to-br from-indigo-50 via-sky-50 to-teal-50 dark:from-indigo-950 dark:via-slate-950 dark:to-teal-950">
      <div className="w-full max-w-md">
        <Card className="rounded-3xl bg-white/90 text-foreground backdrop-blur shadow-xl border">
          <CardContent className="p-8">

            <div className="text-center space-y-3">
              <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight">
                Reset Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to receive a reset link
              </p>
            </div>

            <form onSubmit={handleReset} className="mt-8 space-y-5">

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

              <Button type="submit" className="w-full h-11 font-semibold">
                Send Reset Link
              </Button>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <Link href="/auth/login" className="hover:underline">
                  Back to Login
                </Link>
                <Link href="/auth/register" className="hover:underline">
                  Create Account
                </Link>
              </div>

            </form>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
