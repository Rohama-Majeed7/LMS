import { NextResponse } from "next/server";
import  prisma  from "@/src/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { name, email, password, role, bio, skills } = await request.json();
    const isTeacher = role === "TEACHER";

    // Basic validation
    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        role,
        bio: isTeacher ? bio : null,
        skills: isTeacher ? skills : null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: `${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully`,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}