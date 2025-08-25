// import { Webhook } from "svix";
// import { NextResponse } from "next/server";
// import User from "@/models/User.model";
// import { connectDB } from "@/lib/dbConnect";

// // Define Clerk webhook event structure
// interface ClerkWebhookEvent {
//   data: {
//     id: string;
//     email_addresses: { email_address: string }[];
//     first_name: string | null;
//     last_name: string | null;
//     image_url: string;
//   };
//   type: string;
// }

// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     // Get raw body for verification
//     const payload = await req.text();

//     const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

//     // Verify the webhook
//     const evt = wh.verify(payload, {
//       "svix-id": req.headers.get("svix-id") as string,
//       "svix-timestamp": req.headers.get("svix-timestamp") as string,
//       "svix-signature": req.headers.get("svix-signature") as string,
//     }) as ClerkWebhookEvent; // ✅ explicit type

//     const { data, type } = evt;

//     switch (type) {
//       case "user.created": {
//         const userData = {
//           _id: data.id,
//           email: data.email_addresses[0].email_address,
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           imageUrl: data.image_url,
//         };
//         await User.create(userData);
//         break;
//       }

//       case "user.updated": {
//         const userData = {
//           email: data.email_addresses[0].email_address,
//           name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//           imageUrl: data.image_url,
//         };
//         await User.findByIdAndUpdate(data.id, userData, { new: true });
//         break;
//       }

//       case "user.deleted": {
//         await User.findByIdAndDelete(data.id);
//         break;
//       }

//       default:
//         return NextResponse.json({ message: "Unhandled event" }, { status: 400 });
//     }

//     return NextResponse.json({ message: "Success" }, { status: 200 });
//   } catch (error) {
//     console.error("Error in Clerk webhook:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";

export async function POST() {
  console.log("Webhook hit!");
  return NextResponse.json({ ok: true });
}

