import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User.model";

export async function POST(req: Request) {
  await connectDB();

  try {
    const payload = await req.text();
    const svix_id = req.headers.get("svix-id") as string;
    const svix_timestamp = req.headers.get("svix-timestamp") as string;
    const svix_signature = req.headers.get("svix-signature") as string;

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json(
        { message: "Missing svix headers" },
        { status: 400 }
      );
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as any;

    const { data, type } = evt;

    if (type === "user.created") {
      await User.create({
        _id: data.id,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email_addresses?.[0]?.email_address || "no-email@test.com",
        imageUrl: data.image_url,
      });
      console.log("✅ User created:", data.id);
    }

    if (type === "user.updated") {
      await User.findByIdAndUpdate(data.id, {
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
        email: data.email_addresses?.[0]?.email_address || "no-email@test.com",
        imageUrl: data.image_url,
      });
      console.log("✏️ User updated:", data.id);
    }

    if (type === "user.deleted") {
      await User.findByIdAndDelete(data.id);
      console.log("🗑️ User deleted:", data.id);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("❌ Webhook error:", err);
    return NextResponse.json({ message: "Webhook error" }, { status: 400 });
  }
}
