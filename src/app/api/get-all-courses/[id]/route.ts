import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Course from "@/models/Course.model";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User.model";
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  try {
    const { id } = await context.params;

    const courseData = await Course.findById(id).populate("educator");

    if (!courseData) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    courseData.courseContent.forEach((chapter: any) => {
      chapter.chapterContent.forEach((lecture: any) => {
        if (!lecture.isPreviewFree) {
          lecture.lectureUrl = "";
        }
      });
    });

    return NextResponse.json(
      { message: "Course fetched by id", courseData },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching single course:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
