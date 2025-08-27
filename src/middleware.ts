// middleware.ts
import { clerkMiddleware, createRouteMatcher, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // const { pathname } = req.nextUrl;

  // Allow public routes
  if (isPublicRoute(req)) return;

  // Require authentication
  auth.protect();

  // const { userId } = auth(); 

  // if (!userId) {
  //   return NextResponse.redirect(new URL("/sign-in", req.url));
  // }

  // // Check educator role
  // if (pathname.startsWith("/educator")) {
  //   try {
  //     const user = await clerkClient.users.getUser(userId);

  //     if (user.publicMetadata.role !== "educator") {
  //       return NextResponse.redirect(new URL("/", req.url));
  //     }
  //   } catch (err) {
  //     console.error("❌ Clerk user fetch failed:", err);
  //     return NextResponse.redirect(new URL("/sign-in", req.url));
  //   }
  // }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
