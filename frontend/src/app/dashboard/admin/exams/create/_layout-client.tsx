"use client";

import { Button } from "@/components/ui/button";

export default function ExamCreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* TOP BAR */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold">Create Exam</h1>

        <div className="flex gap-3">
          <Button variant="outline">Preview</Button>
          <Button className="bg-blue-600 text-white">Save</Button>
        </div>
      </header>

      {children}
    </div>
  );
}
