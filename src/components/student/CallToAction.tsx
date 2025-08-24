"use client";

import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-[#1A2A80] py-16 px-6 text-center text-white">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Learning?
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-[#B2B0E8] mb-8">
          Join thousands of learners worldwide and take the next step in your
          career with our courses.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-white text-[#1A2A80] font-semibold px-6 py-3 rounded-lg hover:bg-[#F3F4FF] transition"
          >
            Get Started
          </Link>
          <Link
            href="/courses"
            className="bg-[#3B38A0] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#7A85C1] transition"
          >
            Browse Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
