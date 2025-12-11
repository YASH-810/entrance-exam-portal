"use client";

interface Props {
  active: string;
  setActive: (v: string) => void;
}

export default function SettingsSidebar({ active, setActive }: Props) {
  const items = [
    { id: "details", label: "Exam Details" },
    { id: "navigation", label: "Navigation Settings" },
    { id: "marking", label: "Marking Scheme" },
    { id: "subjects", label: "Subjects" },
    { id: "faculty", label: "Assign Faculty" },
    { id: "security", label: "Security Settings" },
  ];

  return (
    <div className="w-64 border-r bg-white h-screen p-6">
      <h2 className="font-semibold text-xl mb-6">Exam Settings</h2>

      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`cursor-pointer px-3 py-2 rounded-lg 
              ${active === item.id 
                ? "bg-blue-600 text-white" 
                : "hover:bg-gray-200"
              }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
