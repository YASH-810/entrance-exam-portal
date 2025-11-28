import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authAdmin } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Login user
    const login = await signInWithEmailAndPassword(auth, email, password);
    const user = login.user;

    // Get fresh token with claims
    const token = await user.getIdToken(true);

    // Decode claims
    const decoded = await authAdmin.verifyIdToken(token);
    const role = decoded.role || "student";

    const res = NextResponse.json({ message: "Login success", role });

    // Secure httpOnly token cookie
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    // Readable role cookie
    res.cookies.set("role", role, {
      httpOnly: false, // required for proxy
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }
}
