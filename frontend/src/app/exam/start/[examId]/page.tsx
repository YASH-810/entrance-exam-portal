"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Dummy exam data (Later you will fetch from API)
const mockExam = {
  title: "CET Mock Test",
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
  timeLimit: 60, // minutes
};

export default function ExamPage({ params }: any) {
  const { examId } = params;

  // Active subject & question index
  const subjectList = Object.keys(mockExam.subjects);
  const [activeSubject, setActiveSubject] = useState(subjectList[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Question/answers tracking
  const questions = mockExam.subjects[activeSubject];
  const currentQuestion = questions[currentIndex];

  const [answers, setAnswers] = useState<any>({});
  const [visited, setVisited] = useState<any>({});
  const [marked, setMarked] = useState<any>({});

  // Timer (in seconds)
  const [timeLeft, setTimeLeft] = useState(mockExam.timeLimit * 60);

  // TIMER LOGIC
  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          alert("Time Over! Auto-submit triggered.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const formattedTime =
    String(Math.floor(timeLeft / 60)).padStart(2, "0") +
    ":" +
    String(timeLeft % 60).padStart(2, "0");

  // When switching questions
  const goToQuestion = (index: number) => {
    setVisited((prev: any) => ({
      ...prev,
      [`${activeSubject}-${currentIndex}`]: true,
    }));
    setCurrentIndex(index);
  };

  const saveAnswer = (option: string) => {
    setAnswers((prev: any) => ({
      ...prev,
      [`${activeSubject}-${currentIndex}`]: option,
    }));
  };

  const toggleMark = () => {
    setMarked((prev: any) => ({
      ...prev,
      [`${activeSubject}-${currentIndex}`]: !prev[`${activeSubject}-${currentIndex}`],
    }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      goToQuestion(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      goToQuestion(currentIndex - 1);
    }
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
        {/* LEFT PANEL */}
        <div className="flex-1 p-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentIndex + 1}
            </h2>

            <p className="text-lg font-medium mb-6">{currentQuestion.question}</p>

            <RadioGroup
              value={
                answers[`${activeSubject}-${currentIndex}`] ??
                undefined
              }
              onValueChange={(v) => saveAnswer(v)}
              className="space-y-3"
            >
              {currentQuestion.options.map((opt: string) => (
                <label
                  key={opt}
                  className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-100"
                >
                  <RadioGroupItem value={opt} />
                  <span>{opt}</span>
                </label>
              ))}
            </RadioGroup>

            <div className="flex gap-4 mt-6">
              <Button variant="outline" onClick={toggleMark}>
                {marked[`${activeSubject}-${currentIndex}`]
                  ? "Unmark"
                  : "Mark for Review"}
              </Button>

              <Button variant="outline" onClick={() => saveAnswer("")}>
                Clear Response
              </Button>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevQuestion}>
                Previous
              </Button>
              <Button className="bg-blue-600 text-white" onClick={nextQuestion}>
                Save & Next
              </Button>
            </div>
          </Card>
        </div>

        {/* RIGHT QUESTION LIST */}
        <div className="w-72 p-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Choose a Question</h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => {
                const key = `${activeSubject}-${i}`;
                const isAnswered = answers[key];
                const isMarked = marked[key];
                const isVisited = visited[key];

                return (
                  <button
                    key={i}
                    onClick={() => goToQuestion(i)}
                    className={cn(
                      "w-10 h-10 rounded-md text-sm font-semibold",
                      isMarked
                        ? "bg-yellow-400 text-white"
                        : isAnswered
                        ? "bg-blue-600 text-white"
                        : isVisited
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
