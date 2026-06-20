"use client";

import { useState } from "react";

const tasks = [
  {
    id: 1,
    task: "Visa Processing",
    employee: "John Smith",
    dueDate: "20 Jun 2026",
    status: "Pending",
  },
  {
    id: 2,
    task: "Flight Booking",
    employee: "Priya Sharma",
    dueDate: "22 Jun 2026",
    status: "In Progress",
  },
  {
    id: 3,
    task: "Housing Search",
    employee: "Rahul Kumar",
    dueDate: "25 Jun 2026",
    status: "Completed",
  },
  {
    id: 4,
    task: "Document Verification",
    employee: "Aman Gupta",
    dueDate: "28 Jun 2026",
    status: "Pending",
  },
  {
    id: 5,
    task: "Work Permit Approval",
    employee: "Neha Gupta",
    dueDate: "30 Jun 2026",
    status: "In Progress",
  },
  {
    id: 6,
    task: "Airport Pickup Setup",
    employee: "Arjun Patel",
    dueDate: "02 Jul 2026",
    status: "Completed",
  },
  {
    id: 7,
    task: "Laptop Allocation",
    employee: "Karan Mehta",
    dueDate: "03 Jul 2026",
    status: "Pending",
  },
  {
    id: 8,
    task: "Tax Registration",
    employee: "Ananya Jain",
    dueDate: "05 Jul 2026",
    status: "In Progress",
  },
  {
    id: 9,
    task: "Insurance Enrollment",
    employee: "Rohit Kapoor",
    dueDate: "08 Jul 2026",
    status: "Completed",
  },
  {
    id: 10,
    task: "Orientation Session",
    employee: "Ishita Agarwal",
    dueDate: "10 Jul 2026",
    status: "Pending",
  },
];

export default function TasksPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.task.toLowerCase().includes(search.toLowerCase()) ||
      task.employee.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        Tasks
      </h1>

      {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">Total Tasks</p>
          <h2 className="text-5xl font-bold">
            {tasks.length}
          </h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">Pending</p>
          <h2 className="text-5xl font-bold">
            {
              tasks.filter(
                (task) => task.status === "Pending"
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">Completed</p>
          <h2 className="text-5xl font-bold">
            {
              tasks.filter(
                (task) => task.status === "Completed"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-4 bg-slate-800 rounded-lg"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="p-4 bg-slate-800 rounded-lg"
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border border-slate-700">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-4 text-left">Task</th>
            <th className="p-4 text-left">Employee</th>
            <th className="p-4 text-left">Due Date</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredTasks.map((task) => (
            <tr
              key={task.id}
              className="border-t border-slate-700"
            >
              <td className="p-4">{task.task}</td>
              <td className="p-4">{task.employee}</td>
              <td className="p-4">{task.dueDate}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.status === "Completed"
                      ? "bg-green-600"
                      : task.status === "In Progress"
                      ? "bg-yellow-600"
                      : "bg-red-600"
                  }`}
                >
                  {task.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}