"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function AssignFaculty() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Assign Faculty</h2>

      <div className="space-y-4">
        <div>
          <Label>Faculty Email</Label>
          <Input placeholder="teacher@example.com" />
        </div>

        <Button>Add Faculty</Button>

        <ul className="mt-4 space-y-2 text-sm">
          <li>📌 teacher1@example.com</li>
          <li>📌 teacher2@example.com</li>
        </ul>
      </div>
    </div>
  );
}
