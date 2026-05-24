"use client";

import { useRouter } from "next/navigation";
import { logout } from "../apis/auth";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await logout();
      alert(response.message);
      router.push("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

      {/* Title */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-800">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        {/* Search */}
        <input
          placeholder="Search courses..."
          className="hidden md:block border text-gray-600 border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Logout
        </button>

        {/* Profile Circle */}
        <div className="w-9 h-9 rounded-full bg-blue-600"></div>

      </div>
    </header>
  );
}