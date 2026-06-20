import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <div className="w-72 bg-slate-900 p-6 flex flex-col">
        <div>
          <h2 className="text-3xl font-bold mb-2">
            RelocationHub
          </h2>

          <p className="text-gray-400 mb-10">
            Employee Relocation Platform
          </p>

          <ul className="space-y-3 text-lg">
            <li>
              <Link
                href="/dashboard"
                className="block p-3 rounded-lg hover:bg-slate-700"
              >
                🏠 Dashboard
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/relocations"
                className="block p-3 rounded-lg hover:bg-slate-700"
              >
                🌍 Relocations
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/employee"
                className="block p-3 rounded-lg hover:bg-slate-700"
              >
                👥 Add Employee
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/tasks"
                className="block p-3 rounded-lg hover:bg-slate-700"
              >
                📋 Tasks
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/documents"
                className="block p-3 rounded-lg hover:bg-slate-700"
              >
                📄 Documents
              </Link>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pt-10">
          <LogoutButton />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {children}
      </div>
    </main>
  );
}