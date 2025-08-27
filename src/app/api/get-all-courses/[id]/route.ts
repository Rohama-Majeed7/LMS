import Course from "@/models/Course.model";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";

export async function GET(
  req: Request,
  { params }: { params: { id: string } } // 👈 params come from here
) {
  await connectDB();

  try {
    const { id } = params; // ✅ access id

    const courseData = await Course.findById(id).populate({ path: "educator" });

    if (!courseData) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    // Clean preview
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
    console.error("❌ Error fetching single Course:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
