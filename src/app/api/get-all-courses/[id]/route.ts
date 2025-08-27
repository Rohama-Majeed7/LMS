import Course from "@/models/Course.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { id } = req.params;
  try {
    const courseData = await Course.findById(id).populate({ path: "educator" });

    courseData.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
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
    console.log("Error in fetched single Course",error);
    return NextResponse.json({message:"Internal Server Error"},{status:500})
  }
}
