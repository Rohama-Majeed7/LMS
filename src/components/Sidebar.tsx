"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 hidden md:flex flex-col bg-white border-r border-red-500 p-6">

      <h1 className="text-2xl font-bold text-blue-600 mb-10">
        LMS
      </h1>

      <nav className="flex flex-col gap-3 text-sm">

        {[
          "Dashboard",
          "Courses",
          "Enrolled",
          "Settings",
        ].map((item) => (
          <Link
            key={item}
            href={item === "Dashboard" ? "/Dashboard" : `/Dashboard/${item.toLowerCase()}`}
            className="px-3 py-2 rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            {item}
          </Link>
        ))}

      </nav>

    </aside>
  );
}