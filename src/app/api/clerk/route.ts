import { Webhook } from "svix";
import User from "@/models/User.model";
import { connectDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");
    const payload = await req.json();
    await whook.verify(JSON.stringify(payload), {
      "svix-id": req.headers.get("svix-id") as string,
      "svix-timestamp": req.headers.get("svix-timestamp") as string,
      "svix-signature": req.headers.get("svix-signature") as string,
    });
    const { data, type } = payload;
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.create(userData);
        return NextResponse.json({});
      }
      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        return NextResponse.json({});
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return NextResponse.json({});
      }
      default:
        return NextResponse.json(
          { message: "Unhandled event" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.log("Error in User Creation", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
