"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function NavigationSettings() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Navigation</h2>

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <Label>Allow Back Navigation</Label>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <Label>Shuffle Questions</Label>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <Label>Shuffle Options</Label>
          <Switch />
        </div>

      </div>
    </div>
  );
}
