import { NextResponse } from "next/server";
import { auth } from "../../../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authAdmin, dbAdmin } from "../../../../lib/firebase-admin";

export async function POST(req: Request) {
  const { name, number, email, password } = await req.json();

  try {
    // Create user in Firebase Authentication
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // Save user to Firestore using ADMIN (server-side secure)
    await dbAdmin.collection("users").doc(user.uid).set({
      name,
      number,
      email,
      role: "student",
    });

    // Set Firebase custom claim
    await authAdmin.setCustomUserClaims(user.uid, { role: "student" });

    return NextResponse.json({ message: "Student registered" });
  } catch (err: any) {
    console.log("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
