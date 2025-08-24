"use client";
import { dummyCourses } from "@/assets/assets";
import CourseCard from "@/components/student/CourseCard";
import SearchBar from "@/components/student/SearchBar";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const navigate = useRouter();
  return (
    <section className="w-[98vw] max-w-[1050px] mx-auto mt-4">
      <h1 className="text-2xl font-bold">Course List</h1>
      <div className="flex md:flex-row flex-col justify-between items-center mt-5 px-2">
        <p className="cursor-pointer">
          <span className="text-blue-700" onClick={() => navigate.push("/")}>
            Home
          </span>
          /course-list
        </p>
        <SearchBar />
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 my-6 p-4">
        {dummyCourses.map((course, idx) => {
          return <CourseCard key={idx} course={course} />;
        })}
      </div>
    </section>
  );
};

export default page;
