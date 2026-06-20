"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Employee = {
  id: number;
  name: string;
  country: string;
  status: string;
};

export default function RelocationsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadEmployees() {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error(error);
      return;
    }

    setEmployees(data || []);
    setFilteredEmployees(data || []);
    setLoading(false);
  }

  async function deleteEmployee(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("employees")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadEmployees();
  }

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.country
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredEmployees(filtered);
  }, [search, employees]);

  if (loading) {
    return (
      <h1 className="text-3xl font-bold text-white">
        Loading...
      </h1>
    );
  }

  return (
    <main className="text-white">
      <h1 className="text-5xl font-bold mb-8">
        Relocations
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">
            Total Relocations
          </p>

          <h2 className="text-5xl font-bold mt-2">
            {employees.length}
          </h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">
            Active
          </p>

          <h2 className="text-5xl font-bold mt-2">
            {
              employees.filter(
                (employee) =>
                  employee.status === "Active"
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">
            Completed
          </p>

          <h2 className="text-5xl font-bold mt-2">
            {
              employees.filter(
                (employee) =>
                  employee.status === "Completed"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search employee or country..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full p-4 mb-6 rounded-lg bg-slate-800"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-slate-700">
          <thead>
            <tr className="bg-slate-800">
              <th className="p-4 text-left">
                Employee
              </th>

              <th className="p-4 text-left">
                Destination
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-slate-700"
              >
                <td className="p-4">
                  {employee.name}
                </td>

                <td className="p-4">
                  {employee.country}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      employee.status ===
                      "Completed"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>

                <td className="p-4 flex gap-2">
                  <Link
                    href={`/dashboard/employee/${employee.id}`}
                  >
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() =>
                      deleteEmployee(employee.id)
                    }
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}