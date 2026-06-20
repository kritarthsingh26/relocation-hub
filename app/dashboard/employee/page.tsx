"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EmployeePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("Active");
  const [department, setDepartment] =
    useState("Engineering");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name || !country) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("employees")
      .insert([
        {
          name,
          country,
          status,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Employee Added Successfully!");

    router.push("/dashboard/relocations");
    router.refresh();
  };

  return (
    <main className="text-white">
      <div className="mb-8">
        <h1 className="text-5xl font-bold">
          Add Employee
        </h1>

        <p className="text-gray-400 mt-2">
          Create and manage relocation requests
        </p>
      </div>

      <div className="bg-slate-800 p-8 rounded-xl max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 text-gray-300">
              Employee Name
            </label>

            <input
              type="text"
              placeholder="Enter employee name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full p-4 rounded-lg bg-slate-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Destination Country
            </label>

            <input
              type="text"
              placeholder="Enter destination country"
              value={country}
              onChange={(e) =>
                setCountry(e.target.value)
              }
              className="w-full p-4 rounded-lg bg-slate-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Department
            </label>

            <select
              value={department}
              onChange={(e) =>
                setDepartment(e.target.value)
              }
              className="w-full p-4 rounded-lg bg-slate-700"
            >
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Finance</option>
              <option>Operations</option>
              <option>Marketing</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Relocation Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="w-full p-4 rounded-lg bg-slate-700"
            >
              <option>Active</option>
              <option>Completed</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold"
          >
            {loading
              ? "Adding Employee..."
              : "Add Employee"}
          </button>
        </form>
      </div>
    </main>
  );
}