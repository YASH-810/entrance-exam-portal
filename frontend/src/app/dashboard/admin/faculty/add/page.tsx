"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function AddFacultyPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch("/api/admin/add-faculty", {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });

    alert("Faculty added & email sent!");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Add Faculty</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" className="w-full">
          Add Faculty
        </Button>
      </form>
    </div>
  );
}
