"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function MarkingScheme() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Marking Scheme</h2>

      <div className="space-y-4">
        <div>
          <Label>Marks for Correct Answer</Label>
          <Input type="number" placeholder="4" />
        </div>

        <div>
          <Label>Marks for Wrong Answer</Label>
          <Input type="number" placeholder="-1" />
        </div>

        <div className="flex items-center justify-between">
          <Label>Enable Negative Marking</Label>
          <Switch />
        </div>
      </div>
    </div>
  );
}
