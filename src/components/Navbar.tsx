"use client";
export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <input
          placeholder="Search courses..."
          className="hidden md:block border text-gray-600 border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="w-9 h-9 rounded-full bg-blue-600"></div>

      </div>

    </header>
  );
}