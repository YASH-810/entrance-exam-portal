import { NextResponse } from "next/server";
import { authAdmin, dbAdmin } from "@/lib/firebase-admin";  // admin SDK only
import { Timestamp } from "firebase-admin/firestore";

export async function POST(req: Request) {
  try {
    const { name, number, email, password } = await req.json();

    if (!name || !number || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1️⃣ Create user using ADMIN SDK (server environment)
    const userRecord = await authAdmin.createUser({
      email,
      password,
      displayName: name,
    });

    // 2️⃣ Set custom claims
    await authAdmin.setCustomUserClaims(userRecord.uid, { role: "student" });

    // 3️⃣ Save user data to Firestore
    await dbAdmin.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name,
      number,
      email,
      role: "student",
      createdAt: Timestamp.now(),
    });

    // 4️⃣ Return OK
    return NextResponse.json({ message: "Student registered successfully", uid: userRecord.uid });

  } catch (err: any) {
    console.error("REGISTER ERROR:", err);

    return NextResponse.json(
      { error: err.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
}
