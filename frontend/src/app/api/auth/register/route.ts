import { NextResponse } from "next/server";
import { authAdmin, dbAdmin } from "@/lib/firebase-admin";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const { name, number, email, password } = await req.json();

    if (!name || !number || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Create user using ADMIN SDK
    const user = await authAdmin.createUser({
      email,
      password,
      displayName: name,
    });

    // Add custom claim role
    await authAdmin.setCustomUserClaims(user.uid, { role: "student" });

    // Save to Firestore
    await dbAdmin.collection("users").doc(user.uid).set({
      uid: user.uid,
      name,
      number,
      email,
      role: "student",
      createdAt: Timestamp.now(),
    });

    return NextResponse.json({
      message: "Student registered successfully",
      uid: user.uid,
    });

  } catch (err: any) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: err.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
}
