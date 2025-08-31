import Course from "@/models/Course.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/dbConnect";

export async function POST(req: Request) {
  try {
    await connectDB();
    const courseData = await req.json();

    const imgUrl = (
      await cloudinary.uploader.upload(courseData.courseThumbnail)
    ).secure_url;
    const newCourse = await Course.create({
      courseTitle: courseData.courseTitle,
      courseDescription:courseData.courseDescription,
      coursePrice: courseData.coursePrice,
      discount: courseData.discount,
      courseThumbnail: imgUrl,
      courseContent: courseData.courseContent,
      isPublished: courseData.isPublished,
      educator: courseData.educator,
    });

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
