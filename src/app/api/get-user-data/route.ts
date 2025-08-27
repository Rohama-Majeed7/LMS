import User from "@/models/User.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }
    return NextResponse.json(
      { message: "User found Successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in finding user:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
