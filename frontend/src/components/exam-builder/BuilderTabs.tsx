"use client";

export default function BuilderTabs({ activeTab, setActiveTab }: any) {
  return (
    <div className="border-b bg-white px-6">
      <div className="flex gap-6 h-12 items-center">
        <button
          onClick={() => setActiveTab("questions")}
          className={`pb-3 ${
            activeTab === "questions"
              ? "font-semibold border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Questions
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`pb-3 ${
            activeTab === "settings"
              ? "font-semibold border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Settings
        </button>
      </div>
    </div>
  );
}
