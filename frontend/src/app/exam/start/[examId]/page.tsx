"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Define allowed subjects
type Subject = "Physics" | "Chemistry" | "Mathematics";

// Dummy exam data
const mockExam = {
  title: "CET Mock Test",
  timeLimit: 10,

  subjects: {
    Physics: [
      {
        id: 1,
        question: "Physics Q1: What is the speed of light?",
        options: ["3x10⁸ m/s", "5x10⁸ m/s", "1x10⁵ m/s", "None"],
      },
      {
        id: 2,
        question: "Physics Q2: Who discovered X-rays?",
        options: ["Roentgen", "Newton", "Tesla", "Edison"],
      },
    ],
    Chemistry: [
      {
        id: 1,
        question: "Chem Q1: H₂O is?",
        options: ["Water", "Oxygen", "Hydrogen", "Salt"],
      },
    ],
    Mathematics: [
      {
        id: 1,
        question: "Math Q1: 2 + 2 = ?",
        options: ["3", "4", "5", "22"],
      },
    ],
  },
};

export default function ExamPage({ params }: { params: { examId: string } }) {
  const { examId } = params;

  const subjectList = Object.keys(mockExam.subjects) as Subject[];

  const [activeSubject, setActiveSubject] = useState<Subject>("Physics");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data extraction
  const questions = mockExam.subjects[activeSubject];
  const currentQuestion = questions[currentIndex];

  // State tracking
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [visited, setVisited] = useState<Record<string, boolean>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});

  // Timer
  const [timeLeft, setTimeLeft] = useState(mockExam.timeLimit * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert("Time Over! Auto-submit triggered.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime =
    String(Math.floor(timeLeft / 60)).padStart(2, "0") +
    ":" +
    String(timeLeft % 60).padStart(2, "0");

  // Navigation
  const goToQuestion = (i: number) => {
    const key = `${activeSubject}-${currentIndex}`;
    setVisited((prev) => ({ ...prev, [key]: true }));
    setCurrentIndex(i);
  };

  const saveAnswer = (option: string) => {
    const key = `${activeSubject}-${currentIndex}`;
    setAnswers((prev) => ({ ...prev, [key]: option }));
  };

  const toggleMark = () => {
    const key = `${activeSubject}-${currentIndex}`;
    setMarked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* TOP BAR */}
      <div className="flex justify-between items-center px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-4">
          <div className="font-semibold text-lg">{mockExam.title}</div>

          <div className="flex gap-2 ml-6">
            {subjectList.map((sec) => (
              <Button
                key={sec}
                variant={activeSubject === sec ? "default" : "outline"}
                className="px-4 py-1 rounded-full"
                onClick={() => {
                  setActiveSubject(sec);
                  setCurrentIndex(0);
                }}
              >
                {sec}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <span className="font-medium">Student</span>
          <div className="text-red-600 font-bold text-xl">{formattedTime}</div>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-1">
        {/* LEFT */}
        <div className="flex-1 p-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentIndex + 1}
            </h2>

            <p className="text-lg font-medium mb-6">
              {currentQuestion.question}
            </p>

            {/* OPTIONS */}
            <RadioGroup
              value={
                answers[`${activeSubject}-${currentIndex}`] ?? undefined
              }
              onValueChange={saveAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <RadioGroupItem value={opt} />
                  <span>{opt}</span>
                </label>
              ))}
            </RadioGroup>

            {/* ACTIONS */}
            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={toggleMark}>
                {marked[`${activeSubject}-${currentIndex}`]
                  ? "Unmark"
                  : "Mark for Review"}
              </Button>

              <Button
                variant="outline"
                onClick={() => saveAnswer("")}
              >
                Clear Response
              </Button>
            </div>

            {/* NAVIGATION */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() =>
                  currentIndex > 0 && goToQuestion(currentIndex - 1)
                }
              >
                Previous
              </Button>

              <Button
                className="bg-blue-600 text-white"
                onClick={() =>
                  currentIndex < questions.length - 1 &&
                  goToQuestion(currentIndex + 1)
                }
              >
                Save & Next
              </Button>
            </div>
          </Card>
        </div>

        {/* RIGHT PALETTE */}
        <div className="w-72 p-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Choose a Question</h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((_, i) => {
                const key = `${activeSubject}-${i}`;
                return (
                  <button
                    key={i}
                    onClick={() => goToQuestion(i)}
                    className={cn(
                      "w-10 h-10 rounded-md text-sm font-semibold",
                      marked[key]
                        ? "bg-yellow-400 text-white"
                        : answers[key]
                        ? "bg-blue-600 text-white"
                        : visited[key]
                        ? "bg-gray-300"
                        : "bg-gray-200"
                    )}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
