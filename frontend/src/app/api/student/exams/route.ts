import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs 
} from "firebase/firestore";

// GET /api/student/exams
export async function GET() {
  try {
    // 🔹 Fetch list of exams
    const examsSnap = await getDocs(collection(db, "exams"));

    const exams: any[] = [];

    for (const examDoc of examsSnap.docs) {
      const examId = examDoc.id;
      const examData = examDoc.data();

      // 🔹 Fetch subjects for this exam
      const subjectsSnap = await getDocs(
        collection(db, "exams", examId, "subjects")
      );

      const subjects: any[] = [];

      for (const subjectDoc of subjectsSnap.docs) {
        const subjectId = subjectDoc.id;
        const subjectData = subjectDoc.data();

        // 🔹 Fetch questions for this subject
        const questionsSnap = await getDocs(
          collection(db, "exams", examId, "subjects", subjectId, "questions")
        );

        const questions = questionsSnap.docs.map((q) => ({
          id: q.id,
          ...q.data(),
        }));

        subjects.push({
          id: subjectId,
          ...subjectData,
          questions,
        });
      }

      exams.push({
        id: examId,
        ...examData,
        subjects,
      });
    }

    return NextResponse.json(exams, { status: 200 });

  } catch (error: any) {
    console.error("🔥 Student Exams API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
