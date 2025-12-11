import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPanel() {
  return (
    <div className="space-y-6">

      {/* EXAM DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Exam Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Exam Title</Label>
            <Input placeholder="CET Mock Test" />
          </div>

          <div>
            <Label>Description</Label>
            <Input placeholder="Short description..." />
          </div>

          <div>
            <Label>Duration (mins)</Label>
            <Input type="number" placeholder="90" />
          </div>
        </CardContent>
      </Card>

      {/* MORE SECTIONS BELOW */}
      <Card>
        <CardHeader>
          <CardTitle>Marking Scheme</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Correct Answer Marks</Label>
            <Input type="number" placeholder="4" />
          </div>

          <div>
            <Label>Negative Marks</Label>
            <Input type="number" placeholder="-1" />
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
