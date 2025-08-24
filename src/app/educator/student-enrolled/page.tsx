import { dummyStudentEnrolled } from "@/assets/assets";
import React from "react";

const Page = () => {
  return (
    <div className="w-full max-w-[90%] mx-auto p-4 md:p-6">
      {/* Page Title */}
      <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-6 text-gray-800">
        Students Enrolled
      </h2>

      {/* Students Table */}
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full bg-white border rounded-xl shadow-md text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">#</th>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">
                Student Name
              </th>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium">
                Course
              </th>
              <th className="text-left p-2 md:p-3 text-gray-700 font-medium whitespace-nowrap">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyStudentEnrolled.map((std, idx) => (
              <tr
                key={idx}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-2 md:p-3 text-gray-600">{idx + 1}</td>
                <td className="p-2 md:p-3 font-medium text-gray-800 whitespace-nowrap">
                  {std.student.name}
                </td>
                <td className="p-2 md:p-3 text-gray-700">{std.courseTitle}</td>
                <td className="p-2 md:p-3 text-gray-500 text-[10px] sm:text-xs md:text-sm whitespace-nowrap">
                  {new Date(std.purchaseDate).toLocaleDateString()}
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
