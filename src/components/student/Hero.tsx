// components/Hero.tsx
"use client";

import { assets } from "@/assets/assets";
import SearchBar from "./SearchBar";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-[#1A2A80] py-20 px-6 text-center relative overflow-hidden ">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Learn Anytime, Anywhere
        </h1>

        {/* Decorative Sketch */}
        <Image
          src={assets.sketch}
          className="absolute bottom-4 right-6 opacity-70"
          alt="sketch"
          width={60}
          height={60}
        />

        {/* Subtext */}
        <p className="text-lg text-[#B2B0E8] mb-8">
          Explore thousands of courses, improve your skills, and grow your
          career with our Learning Management System.
        </p>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto">
          <SearchBar />
        </div>
      </div>
    </section>
  );
}
