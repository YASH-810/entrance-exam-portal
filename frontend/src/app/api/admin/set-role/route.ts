import { NextResponse } from "next/server";
import { authAdmin, dbAdmin } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    const { uid, role } = await req.json();

    if (!uid || !role) {
      return NextResponse.json(
        { error: "uid and role are required" },
        { status: 400 }
      );
    }

    // Check if user exists in Firebase Auth
    let userRecord;
    try {
      userRecord = await authAdmin.getUser(uid);
    } catch (err: any) {
      console.error("GET USER ERROR:", err);
      if (err.code === "auth/user-not-found") {
        return NextResponse.json(
          { error: "User not found in Firebase Auth" },
          { status: 404 }
        );
      }
      throw err;
    }

    // 1) Set custom claim
    await authAdmin.setCustomUserClaims(uid, { role });

    // 2) Update Firestore user doc
    await dbAdmin.collection("users").doc(uid).set(
      {
        role,
        email: userRecord.email ?? null,
      },
      { merge: true }
    );

    return NextResponse.json({
      message: `Role updated to '${role}' for uid ${uid}`,
    });
  } catch (err: any) {
    console.error("SET-ROLE API ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
