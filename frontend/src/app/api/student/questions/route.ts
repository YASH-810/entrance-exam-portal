import { NextResponse } from "next/server";
import { dbAdmin, authAdmin } from "@/lib/firebase-admin";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const examId = url.searchParams.get("examId");
    if (!examId) return NextResponse.json({ error: "Missing examId" }, { status: 400 });

    // Token:
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = await authAdmin.verifyIdToken(token);
    const uid = decoded.uid;

    // Validate allocation
    const regSnap = await dbAdmin
      .collection("examRegistrations")
      .doc(`${uid}_${examId}`)
      .get();

    if (!regSnap.exists)
      return NextResponse.json({ error: "Not assigned" }, { status: 403 });

    // Fetch sections
    const subjSnap = await dbAdmin
      .collection("exams")
      .doc(examId)
      .collection("subjects")
      .get();

    let subjects: any[] = [];

    for (const s of subjSnap.docs) {
      const subjectId = s.id;

      const qSnap = await dbAdmin
        .collection("exams")
        .doc(examId)
        .collection("subjects")
        .doc(subjectId)
        .collection("questions")
        .get();

      subjects.push({
        subjectId,
        name: s.data().name,
        duration: s.data().durationMins,
        questions: qSnap.docs.map((q) => ({
          id: q.id,
          ...q.data(),
        })),
      });
    }

    return NextResponse.json({ subjects });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
