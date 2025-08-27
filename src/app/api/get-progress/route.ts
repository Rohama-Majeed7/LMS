import courseProgress from "@/models/CourseProgress.model"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req:Request){
try {
    const {userId} = await auth()
    const {courseId,lectureId} = await req.json()
    const progressData =await courseProgress.findOne({userId,courseId})
    if(progressData){
    if(progressData.lectureCompleted.includes(lectureId)){
        return NextResponse.json({message:"Lecture Already completed"},{status:401})
    }
    progressData.lectureCompleted.push(lectureId)
    await progressData.save()}else{
        await courseProgress.create({
            userId,
            courseId,
            lectureCompleted:[lectureId]
        })
    }
    return NextResponse.json({message:"Progress updated"},{status:200})
} catch (error) {
    console.log("Error in completeing progress:",error);
    return NextResponse.json({message:"Internal Server Error"},{status:500})
}
}