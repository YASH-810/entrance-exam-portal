"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CreateExamPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/admin/create-exam", {
      method: "POST",
      body: JSON.stringify({ title, date, duration }),
    });

    alert("Exam Created!");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Create Exam</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Input
          placeholder="Exam Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Input
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <Button type="submit" className="w-full">
          Create Exam
        </Button>
      </form>
    </div>
  );
}
