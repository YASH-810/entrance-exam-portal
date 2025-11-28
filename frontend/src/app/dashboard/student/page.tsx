"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Clock, Users, Star } from "lucide-react";

export default function StudentDashboard() {
  const [exams, setExams] = useState<any[]>([]);

  useEffect(() => {
    // 🔥 Dummy JSON (UI testing only)
    const dummyExams = [
      {
        id: "exam_001",
        name: "Maths Entrance 2025",
        description: "A structured entrance exam for mathematics. 30 MCQs.",
        subjects: [
          {
            subjectId: "math",
            name: "Mathematics",
            durationMins: 60
          }
        ],
        attempts: 120,
        rating: 4.8
      },
      {
        id: "exam_002",
        name: "Science Entrance Test",
        description: "Physics + Chemistry combined section test.",
        subjects: [
          {
            subjectId: "science",
            name: "Science",
            durationMins: 75
          }
        ],
        attempts: 98,
        rating: 4.6
      },
      {
        id: "exam_003",
        name: "General Aptitude",
        description: "30 MCQs covering general reasoning and logic.",
        subjects: [
          {
            subjectId: "aptitude",
            name: "Aptitude",
            durationMins: 45
          }
        ],
        attempts: 64,
        rating: 4.9
      }
    ];

    setExams(dummyExams);
  }, []);

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {(exams ?? []).map((exam) => (
        <Card
          key={exam.id}
          className="rounded-3xl border shadow-md hover:shadow-xl transition bg-white"
        >
          <CardContent className="p-6 space-y-3">
            
            {/* Header */}
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-bold">{exam.name}</h2>

              <Badge className="bg-blue-200 text-blue-700">
                {exam.subjects[0].name}
              </Badge>
            </div>

            <p className="text-sm text-muted-foreground">
              {exam.description}
            </p>

            {/* Stats */}
            <div className="flex justify-between text-sm mt-3">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" /> 
                {exam.subjects?.[0]?.durationMins} min
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" /> 
                {exam.attempts}
              </div>

              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" /> 
                {exam.rating}
              </div>
            </div>

            {/* Start Exam */}
            <Button
              className="w-full mt-4"
              onClick={() =>
                (window.location.href = `/exam/start/${exam.id}`)
              }
            >
              ▶ Start Exam
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
