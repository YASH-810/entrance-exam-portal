"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SecuritySettings() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Security Options</h2>

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <Label>Block Copy/Paste</Label>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <Label>Disable New Tabs</Label>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <Label>Full Screen Mode Required</Label>
          <Switch />
        </div>

      </div>
    </div>
  );
}
