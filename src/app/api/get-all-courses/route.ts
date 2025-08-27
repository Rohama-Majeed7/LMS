import Course from "@/models/Course.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });
    return NextResponse.json(
      { message: "Course fetched Successfully", courses },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in getting Courses", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
