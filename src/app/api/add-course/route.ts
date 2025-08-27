import Course from "@/models/Course.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
export async function POST(req: Request) {
  try {
    const { courseData } = await req.json();
    const { userId: educatorId } = await auth();
    // const imgUrl = await cloudinary.uploader.upload()
    const newCourse = await Course.create({ courseData, educator: educatorId });
    return NextResponse.json(
      { message: "Course Added Successfully", newCourse },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in course adding:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
