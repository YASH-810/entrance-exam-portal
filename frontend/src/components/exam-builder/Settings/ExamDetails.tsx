"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ExamDetails() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Exam Details</h2>

      <div className="space-y-4">

        <div>
          <Label>Exam Title</Label>
          <Input placeholder="Enter exam title" />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea placeholder="Enter description" />
        </div>

        <div>
          <Label>Duration (minutes)</Label>
          <Input type="number" placeholder="120" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Time</Label>
            <Input type="datetime-local" />
          </div>

          <div>
            <Label>End Time</Label>
            <Input type="datetime-local" />
          </div>
        </div>

      </div>
    </div>
  );
}
