import { dummyCourses } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="w-full max-w-[90%] mx-auto p-1 md:p-6">
      {/* Page Title */}
      <h1 className="text-lg sm:text-xl md:text-3xl font-bold mb-6 text-gray-800">
        My Courses
      </h1>

      {/* Courses Table */}
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full bg-white border rounded-xl shadow-md text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">
                All Courses
              </th>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">
                Earnings
              </th>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">
                Students
              </th>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">
                Published On
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyCourses.map((course, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition"
              >
                {/* Course Info */}
                <td className="flex items-center gap-2 md:gap-3 p-2 md:p-3">
                  <Image
                    src={course.courseThumbnail}
                    alt="thumbnail"
                    height={40}
                    width={40}
                    className="rounded-md border w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-cover"
                  />
                  <span className="text-gray-800 font-medium line-clamp-1">
                    {course.courseTitle}
                  </span>
                </td>

                {/* Earnings */}
                <td className="p-2 md:p-3 font-semibold text-green-600 whitespace-nowrap">
                  $
                  {Math.floor(
                    course.enrolledStudents.length *
                      (course.coursePrice -
                        (course.discount * course.coursePrice) / 100)
                  )}
                </td>

                {/* Students Count */}
                <td className="p-2 md:p-3 text-gray-700 text-center md:text-left">
                  {course.enrolledStudents.length}
                </td>

                {/* Published Date */}
                <td className="p-2 md:p-3 text-gray-500 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
