import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import Course from "@/models/Course.model";
import { connectDB } from "@/lib/dbConnect";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } } // 👈 inline typing, no custom interface
) {
  await connectDB();

  try {
    const { id } = params;

    const courseData = await Course.findById(id).populate({ path: "educator" });

    if (!courseData) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    // Hide lectureUrl if not free preview
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
