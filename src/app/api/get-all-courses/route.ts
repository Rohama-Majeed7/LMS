import { NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import Course from "@/models/Course.model";
import User from "@/models/User.model"; // 👈 force import
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();

    // Debugging line
    console.log("🔍 Registered Models:", Object.keys(mongoose.models));

    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate("educator","name email imageUrl");

    return NextResponse.json({ courses }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
