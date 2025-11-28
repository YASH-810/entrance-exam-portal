"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const exams = [
  { id: "1", title: "Physics Test 1", date: "2025-01-10" },
  { id: "2", title: "Chemistry Test 1", date: "2025-01-15" },
];

export default function ExamsPage() {
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Exams</h1>

        <Link href="/dashboard/admin/exams/create">
          <Button>Create Exam</Button>
        </Link>
      </div>

      <Card className="p-6">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Exam</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-3">{e.title}</td>
                <td className="p-3">{e.date}</td>
                <td className="p-3 space-x-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="destructive">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
