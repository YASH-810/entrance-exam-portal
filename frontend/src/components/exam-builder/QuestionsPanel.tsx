"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function QuestionsPanel() {
  const [questions, setQuestions] = useState<any[]>([]);

  return (
    <div className="space-y-4">
      {questions.map((q, i) => (
        <Card key={i}>
          <CardContent className="p-6">
            Question editor here...
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={() =>
          setQuestions([...questions, { question: "", options: ["", "", "", ""] }])
        }
      >
        + Add Question
      </Button>
    </div>
  );
}
