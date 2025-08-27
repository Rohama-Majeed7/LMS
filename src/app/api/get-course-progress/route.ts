import courseProgress from "@/models/CourseProgress.model"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req:Request){
try {
    const {userId} = await auth()
    const {courseId} = await req.json()
    const progressData =await courseProgress.findOne({userId,courseId})
    
    return NextResponse.json({message:"Progress updated",progressData},{status:200})
} catch (error) {
    console.log("Error in completeing progress:",error);
    return NextResponse.json({message:"Internal Server Error"},{status:500})
}
}