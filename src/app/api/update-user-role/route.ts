import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req:Request) {
  const user =  currentUser
  
  try {
    return NextResponse.json({user})
  } catch (error) {
    
  }
}