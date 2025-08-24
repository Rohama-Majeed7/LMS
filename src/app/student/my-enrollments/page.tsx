"use client";
import { dummyCourses } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { calculateTime } from "@/utils/calculateTime";
import { useRouter } from "next/navigation";
import { Line } from "rc-progress";
const Page = () => {
  const [progressBar, setProgressBar] = useState([
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 3, totalLectures: 4 },
    { lecturesCompleted: 4, totalLectures: 4 },
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 5, totalLectures: 6 },
    { lecturesCompleted: 6, totalLectures: 6 },
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 3, totalLectures: 6 },
  ]);
  const navigate = useRouter();
  return (
    <div className="px-4 sm:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1A2A80] mb-6">
        My Enrollments
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-[#1A2A80] text-white text-left">
              <th className="px-4 py-3 text-sm sm:text-base font-medium">
                Course
              </th>
              <th className="px-4 py-3 text-sm sm:text-base font-medium">
                Duration
              </th>
              <th className="px-4 py-3 text-sm sm:text-base font-medium">
                Completed
              </th>
              <th className="px-4 py-3 text-sm sm:text-base font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {dummyCourses.map((course, index) => (
              <tr
                key={index}
                className="border-b last:border-0 hover:bg-[#f8f9ff] transition"
              >
                {/* Course Thumbnail + Title */}
                <td className="px-4 py-4 flex items-center gap-3">
                  <div className="relative w-16 h-12 flex-shrink-0">
                    <Image
                      src={course.courseThumbnail}
                      alt="course"
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <p className="font-medium text-gray-700 text-sm sm:text-base">
                      {course.courseTitle}
                    </p>
                    <Line
                      strokeWidth={2}
                      percent={
                        progressBar[index]
                          ? (progressBar[index].lecturesCompleted /
                              progressBar[index].totalLectures) *
                            100
                          : 0
                      }
                      className="bg-gray-300 rounded-full"
                    />
                  </div>
                </td>

                {/* Duration */}
                <td className="px-4 py-4 text-gray-600 text-sm sm:text-base">
                  {calculateTime(course)}
                </td>

                {/* Completed Lectures */}
                <td className="px-4 py-4 text-gray-600 text-sm sm:text-base">
                  {progressBar[index] &&
                    `${progressBar[index].lecturesCompleted} / ${progressBar[index].totalLectures} Lectuures`}
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <button
                    onClick={() =>
                      navigate.push(`/student/player/${course._id}`)
                    }
                    className="px-4 cursor-pointer py-1.5 text-xs sm:text-sm bg-[#3B38A0] text-white rounded-lg hover:bg-[#1A2A80] transition"
                  >
                    {progressBar[index] &&
                    progressBar[index].lecturesCompleted /
                      progressBar[index].totalLectures ===
                      1
                      ? "Completed"
                      : "On Going"}
                  </button>
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
