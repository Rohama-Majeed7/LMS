import Course from "@/models/Course.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = await auth();
  try {
    const educatorCourses = await Course.find({ educator:userId });
    if (educatorCourses.length === 0) {
      return NextResponse.json(
        { messgae: "No Course of this educator" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { message: "Courses found Successfuly", educatorCourses },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in get educator course:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
