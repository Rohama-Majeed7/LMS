"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { PanelRight } from "lucide-react";

const Sidebar = () => {
  const [showSideBar, setShowSidebar] = useState(true);

  return (
    <aside
      className={`relative h-screen bg-white text-gray-800 shadow-md border-r flex flex-col py-6 px-4 transition-all duration-300
        ${showSideBar ? "w-20" : "w-64"}`}
    >
      {/* Toggle Button */}
      <PanelRight
        className="absolute top-2 right-2 cursor-pointer"
        onClick={() => setShowSidebar(!showSideBar)}
      />

      <nav className="flex flex-col gap-2 mt-8">
        {/* Dashboard */}
        <Link
          href="/educator"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        >
          <Image src={assets.home_icon} height={24} width={24} alt="Dashboard" />
          <span
            className={`text-sm md:text-base font-medium  ${
              showSideBar ? "hidden" : "inline"
            }`}
          >
            Dashboard
          </span>
        </Link>

        {/* Add Course */}
        <Link
          href="/educator/add-course"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        >
          <Image src={assets.add_icon} height={24} width={24} alt="Add Course" />
          <span
            className={`text-sm md:text-base font-medium transition-opacity duration-300 ${
              showSideBar ? "hidden" : "inline"
            }`}
          >
            Add Course
          </span>
        </Link>

        {/* My Courses */}
        <Link
          href="/educator/my-courses"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        >
          <Image
            src={assets.my_course_icon}
            height={24}
            width={24}
            alt="My Courses"
          />
          <span
            className={`text-sm md:text-base font-medium  ${
              showSideBar ? "hidden" : "inline"
            }`}
          >
            My Courses
          </span>
        </Link>

        {/* Student Enrolled */}
        <Link
          href="/educator/student-enrolled"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition"
        >
          <Image
            src={assets.person_tick_icon}
            height={24}
            width={24}
            alt="Student Enrolled"
          />
          <span
            className={`text-sm md:text-base font-medium ${
              showSideBar ? "hidden" : "inline"
            }`}
          >
            Student Enrolled
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
