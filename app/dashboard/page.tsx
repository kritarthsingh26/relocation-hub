import LogoutButton from "@/components/LogoutButton";
import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const { data: employees } = await supabase
    .from("employees")
    .select("*");

  const totalEmployees = employees?.length || 0;

  const activeEmployees =
    employees?.filter(
      (employee) => employee.status === "Active"
    ).length || 0;

  const completedEmployees =
    employees?.filter(
      (employee) => employee.status === "Completed"
    ).length || 0;

  const countriesCovered = new Set(
    employees?.map((employee) => employee.country)
  ).size;

  return (
    <main className="text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold">
            HR Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Employee Relocation Management Platform
          </p>
        </div>

        <LogoutButton />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">
            Total Employees
          </p>
          <h2 className="text-5xl font-bold mt-2">
            {totalEmployees}
          </h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">
            Active Relocations
          </p>
          <h2 className="text-5xl font-bold mt-2">
            {activeEmployees}
          </h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">
            Completed
          </p>
          <h2 className="text-5xl font-bold mt-2">
            {completedEmployees}
          </h2>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <p className="text-gray-400">
            Countries Covered
          </p>
          <h2 className="text-5xl font-bold mt-2">
            {countriesCovered}
          </h2>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Recent Employees */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Recent Employees
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-3">
                  Employee
                </th>
                <th className="text-left p-3">
                  Country
                </th>
                <th className="text-left p-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {employees
                ?.slice(-5)
                .reverse()
                .map((employee) => (
                  <tr
                    key={employee.id}
                    className="border-b border-slate-700"
                  >
                    <td className="p-3">
                      {employee.name}
                    </td>

                    <td className="p-3">
                      {employee.country}
                    </td>

                    <td className="p-3">
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
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Upcoming Relocations */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Upcoming Relocations
          </h2>

          <div className="space-y-4">
            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="font-semibold">
                Rahul Sharma
              </p>
              <p className="text-gray-300">
                USA • 25 Jun 2026
              </p>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="font-semibold">
                Priya Singh
              </p>
              <p className="text-gray-300">
                Canada • 28 Jun 2026
              </p>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="font-semibold">
                Neha Gupta
              </p>
              <p className="text-gray-300">
                Singapore • 02 Jul 2026
              </p>
            </div>

            <div className="bg-slate-700 p-4 rounded-lg">
              <p className="font-semibold">
                Karan Mehta
              </p>
              <p className="text-gray-300">
                UK • 05 Jul 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-800 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold">
          RelocationHub © 2026
        </h3>

        <p className="text-gray-400 mt-2">
          Employee Relocation Management Platform
        </p>
      </div>
    </main>
  );
}