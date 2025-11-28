import { NextResponse } from "next/server";
import { auth } from "../../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authAdmin, dbAdmin } from "../../../../lib/firebase-admin";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    // Firebase client login
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // fresh token with custom claims
    const token = await user.getIdToken(true);

    // verify token using admin SDK
    const decoded = await authAdmin.verifyIdToken(token);

    // set secure HTTPONLY cookie
    const response = NextResponse.json({ message: "Login successful", role: decoded.role });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return response;

  } catch (err) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }
}
