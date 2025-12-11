"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import QuestionsPanel from "@/components/exam-builder/QuestionsPanel";
import SettingsPanel from "@/components/exam-builder/SettingsPanel";

export default function ExamCreatePage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* TOP HEADER */}
      <div className="h-16 bg-white border-b flex items-center justify-between px-6">
        <h1 className="text-xl font-semibold">Create Exam</h1>

        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-md border">Preview</button>
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white">
            Save
          </button>
        </div>
      </div>

      {/* MAIN TABS */}
      <Tabs defaultValue="questions" className="w-full">
        <div className="bg-white border-b px-6">
          <TabsList>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="questions">
            <QuestionsPanel />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsPanel />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
