import Course from "@/models/Course.model";
import Purchase from "@/models/Purchase.model";
import User from "@/models/User.model";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    const { courseId } = await req.json();
    const { userId } = await auth();
    const courseData = await Course.findById(courseId);
    const userData = await User.findById(userId);
    if (!courseData || !userData) {
      return NextResponse.json(
        { message: "courses and user data not found" },
        { status: 401 }
      );
    }
    const purchaseData = {
      courseId: courseData._id,
      userId,
      amount: (
        courseData.coursePrice -
        (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2),
    };
    const newPurchaseData = await Purchase.create(purchaseData);
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || "");
    const currency = process.env.CURRENCY?.toLowerCase();

    const list_items = [
      {
        price_data: {
          currency: currency as string,
          product_data: {
            name: courseData.courseTitle,
          },
          unit_amount: Math.floor(newPurchaseData.amount) * 100,
        },
        quantity: 1,
      },
    ];
    const sessions:any = stripeInstance.checkout.sessions.create({
      success_url: ``,
      cancel_url: ``,
      line_items: list_items,
      mode: "payment",
      metadata:{
        purchaseId: newPurchaseData._id.toString() || "",
      },
    });
    return NextResponse.json(
      { message: "purchase successfully", session_url: (await sessions).url },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in purchasing course:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
