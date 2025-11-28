"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");  // 🔥 use number
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      await toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name,
                number,   // 🔥 FIXED: send number (not phone)
                email,
                password,
              }),
            });

            const data = await res.json();

            if (!res.ok) {
              reject(data.error || "Registration failed");
              return;
            }

            resolve("success");

            setTimeout(() => {
              router.push("/auth/login");
            }, 1000);
          } catch (err) {
            reject("Network error");
          } finally {
            setLoading(false);
          }
        }),
        {
          loading: "Creating your account...",
          success: "Account created successfully!",
          error: (err) => err.toString(),
        }
      );
    },
    [name, number, email, password, router]
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
              <h1 className="text-2xl font-extrabold tracking-tight">Create Account</h1>
              <p className="text-sm text-muted-foreground">Join the Entrance Exam Portal</p>
            </div>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="number">Phone Number</Label>
                <Input
                  id="number"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>

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

              <Button type="submit" className="w-full h-11 font-semibold" disabled={loading}>
                {loading ? "Please wait..." : "Sign Up"}
              </Button>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <Link href="/auth/login" className="hover:underline">
                  Already have an account? Login
                </Link>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
