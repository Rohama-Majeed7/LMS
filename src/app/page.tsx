import CallToAction from "@/components/student/CallToAction";
import Companies from "@/components/student/Companies";
import CoursesSection from "@/components/student/CoursesSection";
import Hero from "@/components/student/Hero";
import Testimonials from "@/components/student/Testimonial";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
const page = () => {
  console.log("user:",currentUser);
  
  return (
    <>
      <Hero />
      <div className="w-[98vw] max-w-[1050px] mx-auto">
        <Companies />
        <CoursesSection />
        <Testimonials />
      </div>
      <CallToAction />
    </>
  );
};

export default page;
