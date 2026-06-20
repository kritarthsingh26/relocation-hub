export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">
        RelocationHub
      </h1>

      <p className="text-xl text-gray-300 mb-8">
        Smart Relocation Management Platform
      </p>

      <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
        Login
      </button>
    </main>
  );
}