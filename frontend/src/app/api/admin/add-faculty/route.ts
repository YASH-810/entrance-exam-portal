import { NextResponse } from "next/server";
import { authAdmin, dbAdmin } from "../../../../lib/firebase-admin";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, number, password } = body;

  // Verify caller is admin
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = await authAdmin.verifyIdToken(token);
  if (decoded.role !== "admin")
    return NextResponse.json({ error: "Admin only" }, { status: 403 });

  // Create faculty user
  const userRecord = await authAdmin.createUser({
    email,
    password,
    displayName: name,
  });

  // Add role
  await authAdmin.setCustomUserClaims(userRecord.uid, { role: "faculty" });

  // Save metadata
  await dbAdmin.collection("users").doc(userRecord.uid).set({
    name,
    email,
    number,
    role: "faculty",
  });

  return NextResponse.json({ message: "Faculty added" });
}
