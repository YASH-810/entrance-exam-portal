import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    await sendPasswordResetEmail(auth, email);

    return NextResponse.json({
      success: true,
      message: "Password reset email sent.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to send reset email." },
      { status: 500 }
    );
  }
}
