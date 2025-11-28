import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authAdmin, dbAdmin } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Login using Firebase Client SDK
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // Generate token (forces refresh to get custom claims)
    const token = await user.getIdToken(true);

    // Decode with Firebase Admin to read custom claims
    const decoded = await authAdmin.verifyIdToken(token);
    const role = decoded.role || "student";

    // Response body
    const res = NextResponse.json({ message: "Login successful", role });

    // Secure cookie: token (httpOnly)
    res.cookies.set("token", token, {
      httpOnly: true,     // cannot be accessed in JS
      secure: true,       // required for vercel
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // Non-httpOnly cookie: role → proxy.ts will read this
    res.cookies.set("role", role, {
      httpOnly: false,     // readable by proxy
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return res;

  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 400 }
    );
  }
}
