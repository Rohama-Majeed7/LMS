// middleware.ts
import { clerkClient, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async(auth, req) => {
  // Public routes ko allow
  if (isPublicRoute(req)) return;

  // Protect rest
  auth.protect();

const { pathname } = req.nextUrl;
const {userId} = await auth()
const client = await clerkClient()
const response =await client.users.getUser(userId || "")
  // Agar educator routes access kar raha hai
  if (pathname.startsWith("/educator")) {
    if (response.publicMetadata.role !== "educator") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
