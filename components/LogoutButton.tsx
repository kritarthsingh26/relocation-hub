"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <button
      onClick={logout}
      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
    >
      Logout
    </button>
  );
}