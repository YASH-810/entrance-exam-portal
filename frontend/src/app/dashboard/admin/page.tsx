import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCog, FileEdit, BarChart3 } from "lucide-react";

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Students */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">120</h2>
              <p className="text-gray-500">Students</p>
            </div>
            <Users className="w-10 h-10 text-blue-600" />
          </CardContent>
        </Card>

        {/* Faculty */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">15</h2>
              <p className="text-gray-500">Faculty</p>
            </div>
            <UserCog className="w-10 h-10 text-green-600" />
          </CardContent>
        </Card>

        {/* Exams */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">8</h2>
              <p className="text-gray-500">Exams</p>
            </div>
            <FileEdit className="w-10 h-10 text-orange-600" />
          </CardContent>
        </Card>

        {/* Results */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">4</h2>
              <p className="text-gray-500">Results Published</p>
            </div>
            <BarChart3 className="w-10 h-10 text-purple-600" />
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
