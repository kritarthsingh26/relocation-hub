"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function EditEmployeePage() {
  const params = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEmployee() {
      const { data } = await supabase
        .from("employees")
        .select("*")
        .eq("id", params.id)
        .single();

      if (data) {
        setName(data.name);
        setCountry(data.country);
        setStatus(data.status);
      }

      setLoading(false);
    }

    loadEmployee();
  }, [params.id]);

  async function handleUpdate(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const { error } = await supabase
      .from("employees")
      .update({
        name,
        country,
        status,
      })
      .eq("id", params.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Employee Updated!");

    router.push(
      "/dashboard/relocations"
    );
  }

  if (loading) {
    return (
      <h1 className="text-3xl font-bold">
        Loading...
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-5xl font-bold mb-8">
        Edit Employee
      </h1>

      <form
        onSubmit={handleUpdate}
        className="max-w-lg space-y-4"
      >
        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <input
          type="text"
          value={country}
          onChange={(e) =>
            setCountry(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800"
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="w-full p-3 rounded bg-slate-800"
        >
          <option>Active</option>
          <option>Completed</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 px-6 py-3 rounded"
        >
          Update Employee
        </button>
      </form>
    </>
  );
}