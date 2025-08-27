import Course from "@/models/Course.model";
import Purchase from "@/models/Purchase.model";
import User from "@/models/User.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId: educatorId } = await auth();
  try {
    const educatorCourses = await Course.find({ educator: educatorId });
    const totalCourses = educatorCourses.length;
    const courseIds = educatorCourses.map((course) => course._id);
    const purchaseCourse = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });

    const totalEarnings = purchaseCourse.reduce(
      (acc, item) => acc + item.amount,
      0
    );

    const enrolledStudentsData: any = [];
    for (const course of educatorCourses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }

    return NextResponse.json(
      {
        message: "Educator Dashboard Got Successfully",
        dashboardData: { totalEarnings, enrolledStudentsData, totalCourses },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in get educator data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 200 }
    );
  }
}
