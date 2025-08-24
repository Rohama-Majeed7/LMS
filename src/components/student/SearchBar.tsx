"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (input) {
      router.push(`/student/course-list/${input}`);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="flex items-center bg-white shadow-lg rounded-full overflow-hidden max-w-xl mx-auto border border-[#B2B0E8]">
        {/* Search Icon */}
        <Image
          src={assets.search_icon}
          alt="Search Icon"
          width={24}
          height={24}
          className="ml-4 opacity-80"
        />

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search for courses..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow px-4 py-3 outline-none text-[#1A2A80] placeholder-gray-400"
        />

        {/* Button */}
        <button
          className="bg-[#3B38A0] text-white px-6 py-3 hover:bg-[#7A85C1] transition-colors flex items-center gap-2"
        >
          <Search size={20} /> Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
