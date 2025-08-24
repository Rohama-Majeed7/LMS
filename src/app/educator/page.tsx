import { assets, dummyDashboardData } from "@/assets/assets";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="p-4 md:p-6 w-full">
      {/* Page Title */}
      <h1 className="text-xl md:text-3xl font-bold mb-6 text-gray-800">
        Educator Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 md:gap-6 mb-8">
        {/* Total Enrolled Students */}
        <div className="flex h-fit flex-row  items-center gap-4 bg-white shadow-md rounded-xl p-2 border hover:shadow-lg transition">
          <Image
            src={assets.patients_icon}
            height={40}
            width={40}
            alt="students"
            className="bg-blue-100 p-2 rounded-lg"
          />
          <div>
            <p className="text-lg md:text-2xl font-bold text-gray-800">
              {dummyDashboardData.enrolledStudentsData.length}
            </p>
            <p className="text-gray-600 text-xs md:text-sm">
              Total Enrolled Students
            </p>
          </div>
        </div>

        {/* Total Courses */}
        <div className="flex flex-row  items-center gap-4 bg-white shadow-md rounded-xl p-2 border hover:shadow-lg transition">
          <Image
            src={assets.my_course_icon}
            height={40}
            width={40}
            alt="courses"
            className="bg-green-100 p-2 rounded-lg"
          />
          <div>
            <p className="text-lg md:text-2xl font-bold text-gray-800">
              {dummyDashboardData.totalCourses}
            </p>
            <p className="text-gray-600 text-xs md:text-sm">Total Courses</p>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="flex flex-row p-2  items-center gap-4 bg-white shadow-md rounded-xl  border hover:shadow-lg transition">
          <Image
            src={assets.earning_icon}
            height={40}
            width={40}
            alt="earnings"
            className="bg-yellow-100 p-2 rounded-lg"
          />
          <div>
            <p className="text-lg md:text-2xl font-bold text-gray-800">
              ${dummyDashboardData.totalEarnings}
            </p>
            <p className="text-gray-600 text-xs md:text-sm">Total Earnings</p>
          </div>
        </div>
      </div>

      {/* Latest Enrollment */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
        Latest Enrollments
      </h2>

      <div className="overflow-auto h-[400px] ">
        <table className="table-auto w-full bg-white border rounded-xl shadow-md text-sm md:text-base">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">#</th>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">Student</th>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">Course Title</th>
            </tr>
          </thead>
          <tbody>
            {dummyDashboardData.enrolledStudentsData.map((std, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-2 md:p-3">{idx + 1}</td>
                <td className="flex items-center gap-2 md:gap-3 p-2 md:p-3">
                  <Image
                    src={std.student.imageUrl}
                    alt="student"
                    height={36}
                    width={36}
                    className="rounded-full border object-cover"
                  />
                  <span className="text-gray-800 font-medium">{std.student.name}</span>
                </td>
                <td className="p-2 md:p-3 text-gray-700">{std.courseTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
