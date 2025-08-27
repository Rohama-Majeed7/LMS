import Course from "@/models/Course.model";
import User from "@/models/User.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  const { courseId, rating } = await req.json();
  if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
    return NextResponse.json({ message: "Invalid Details" }, { status: 401 });
  }
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 401 }
      );
    }
    const user = await User.findById(userId);
    if (!user || !user.enrolledCourses.includes(courseId)) {
      return NextResponse.json(
        { message: "User has not purchased this course" },
        { status: 401 }
      );
    }
    const existRatingIndex = course.courseRatings.findIndex(
      (r: any) => r.userId === userId
    );
    if (existRatingIndex > -1) {
      course.courseRatings[existRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }
    await course.save();
    return NextResponse.json({ message: "Rating added" }, { status: 200 });
  } catch (error) {
    console.log("error in rating course:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
