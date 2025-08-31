"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { dummyCourses } from "@/assets/assets";
import CourseCard from "./CourseCard";
import { useAuthStore } from "@/store/useAuthStore";

const CoursesSection = () => {
  const { courses, setCourses } = useAuthStore();
  console.log("courses:", courses);
  useEffect(() => {
    setCourses();
  }, []);
  return (
    <section className="bg-[#F9FAFB] py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A2A80] mb-4">
          Explore Our Courses
        </h2>

        {/* Subtext */}
        <p className="text-sm sm:text-base md:text-lg text-[#7A85C1] mb-8">
          Enhance your skills with our comprehensive courses designed for all
          levels.
        </p>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <CourseCard course={course} key={idx} />
        ))}
      </div>

      {/* Show more link */}
      <Link
        href="/student/course-list"
        className="text-[#3B38A0] hover:text-[#7A85C1] font-medium text-center block mt-6 text-sm sm:text-base"
      >
        Show more courses
      </Link>
    </section>
  );
};

export default CoursesSection;
