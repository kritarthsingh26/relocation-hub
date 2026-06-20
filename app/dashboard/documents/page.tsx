const documents = [
  {
    id: 1,
    employee: "John Smith",
    document: "Passport Copy",
    status: "Verified",
  },
  {
    id: 2,
    employee: "Priya Sharma",
    document: "Visa Approval",
    status: "Pending",
  },
  {
    id: 3,
    employee: "Rahul Kumar",
    document: "Offer Letter",
    status: "Verified",
  },
  {
    id: 4,
    employee: "Aman Gupta",
    document: "Work Permit",
    status: "Pending",
  },
  {
    id: 5,
    employee: "Neha Gupta",
    document: "Rental Agreement",
    status: "Verified",
  },
  {
    id: 6,
    employee: "Arjun Patel",
    document: "Insurance Policy",
    status: "Verified",
  },
  {
    id: 7,
    employee: "Karan Mehta",
    document: "Joining Letter",
    status: "Pending",
  },
  {
    id: 8,
    employee: "Ananya Jain",
    document: "Tax Registration",
    status: "Verified",
  },
  {
    id: 9,
    employee: "Rohit Kapoor",
    document: "Employment Contract",
    status: "Pending",
  },
  {
    id: 10,
    employee: "Ishita Agarwal",
    document: "Flight Ticket",
    status: "Verified",
  },
];
export default function DocumentsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-8">
        Documents
      </h1>

      <div className="grid grid-cols-3 gap-6 mb-8">
  <div className="bg-slate-800 p-6 rounded-xl">
    <p className="text-gray-400">
      Total Documents
    </p>

    <h2 className="text-5xl font-bold">
      {documents.length}
    </h2>
  </div>

  <div className="bg-slate-800 p-6 rounded-xl">
    <p className="text-gray-400">
      Verified
    </p>

    <h2 className="text-5xl font-bold">
      {
        documents.filter(
          (doc) => doc.status === "Verified"
        ).length
      }
    </h2>
  </div>

  <div className="bg-slate-800 p-6 rounded-xl">
    <p className="text-gray-400">
      Pending
    </p>

    <h2 className="text-5xl font-bold">
      {
        documents.filter(
          (doc) => doc.status === "Pending"
        ).length
      }
    </h2>
  </div>
</div>

      <table className="w-full border border-slate-700">
        <thead>
          <tr className="bg-slate-800">
            <th className="p-4 text-left">Employee</th>
            <th className="p-4 text-left">Document</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="border-t border-slate-700"
            >
              <td className="p-4">{doc.employee}</td>
              <td className="p-4">{doc.document}</td>

              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full ${
                    doc.status === "Verified"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {doc.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}