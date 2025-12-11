"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function SubjectsSettings() {
  const [subjects, setSubjects] = useState(["Physics", "Chemistry"]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Subjects</h2>

      <div className="space-y-3">
        {subjects.map((s, i) => (
          <div key={i} className="flex gap-2">
            <Input value={s} />
            <Button variant="destructive">X</Button>
          </div>
        ))}

        <Button>Add Subject</Button>
      </div>
    </div>
  );
}
