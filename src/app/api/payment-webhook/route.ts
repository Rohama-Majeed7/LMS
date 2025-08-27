import Course from "@/models/Course.model";
import Purchase from "@/models/Purchase.model";
import User from "@/models/User.model";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || "");
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";
  let event;
  try {
    event = Stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOKS_SECRET || ""
    );

switch (event.type) {
      case 'payment_intent.succeeded':{
        // Handle successful payment
        const payment_intent = event.data.object
        const payment_intent_id = payment_intent.id
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent:payment_intent_id
        })
        const {purchaseId} = session.data[0].metadata;
        const purchaseData = await Purchase.findById(purchaseId)
        const courseData = await Course.findById(purchaseData.courseId.toString())
        const userData = await User.findById(purchaseId.userId)
        courseData.enrolledStudents.push(userData)
        await courseData.save()
        userData.enrolledCourses.push(courseData._id)
        await userData.save()

        purchaseData.status = 'completed'
        await purchaseData.save()
        break;}
      case 'payment_intent.payment_failed':{
        // Handle successful subscription payment
        const payment_intent = event.data.object
        const payment_intent_id = payment_intent.id
        const session = await stripeInstance.checkout.sessions.list({
            payment_intent:payment_intent_id
        })
        const {purchaseId} = session.data[0].metadata;
        const purchaseData = await Purchase.findById(purchaseId)
        purchaseData.status = 'failed'
        await purchaseData.save()
        break;}
      // Add more cases for other event types you want to handle
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
return NextResponse.json({receive:true})
  } catch (err) {
    console.error("Error verifying webhook signature:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
