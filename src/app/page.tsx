"use client";
import CallToAction from "@/components/student/CallToAction";
import Companies from "@/components/student/Companies";
import CoursesSection from "@/components/student/CoursesSection";
import Hero from "@/components/student/Hero";
import Testimonials from "@/components/student/Testimonial";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth, useUser } from "@clerk/nextjs";
import { log } from "node:console";
import React, { useEffect, useState } from "react";
const page = () => {
  const { setToken} = useAuthStore();
  const { user } = useUser();
  const { getToken } = useAuth();
  console.log("user id:", typeof  user?.id);
  
  const logToken = async () => {
    // if (user) {
      const mytoken = await getToken();
      setToken(mytoken);
      
    // }
  };
  useEffect(() => {
    logToken();
  }, []);
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
