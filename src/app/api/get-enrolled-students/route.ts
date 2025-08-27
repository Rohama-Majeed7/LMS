import Course from "@/models/Course.model";
import Purchase from "@/models/Purchase.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  try {
    const courses = await Course.find({ educator: userId });
    const courseIds = courses.map((course) => course._id);

    const pusrcahses = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageUrl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = pusrcahses.map((purchase) => ({
      student: purchase.userId,
      courseTitle: purchase.courseId.courseTitle,
      purchaseDate: purchase.createdAt,
    }));

    return NextResponse.json(
      { message: "enrolled student got Successfully", enrolledStudents },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting enrolled student", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
