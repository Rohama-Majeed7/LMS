import User from "@/models/User.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  try {
    const userData = await User.findById(userId).populate("enrolledCourses");
    return NextResponse.json(
      {
        message: "User enrolled courses",
        enrolledCoures: userData.enrolledCoures,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error in user enrolled course:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
