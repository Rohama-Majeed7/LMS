"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { dummyTestimonial } from "@/assets/assets";

export default function Testimonials() {
  return (
    <section className="bg-[#F9FAFF] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A2A80] mb-4">
          What Our Learners Say
        </h2>
        <p className="text-[#7A85C1] mb-12 max-w-2xl mx-auto">
          Hear from students who have transformed their careers with our LMS.
        </p>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dummyTestimonial.map((t, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl p-6 text-left hover:shadow-lg hover:bg-[#F3F4FF] transition"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-[#1A2A80]">{t.name}</h3>
                  <p className="text-sm text-[#7A85C1]">{t.role}</p>
                </div>
              </div>

              {/* Feedback */}
              <p className="text-[#3B38A0] mb-4 text-sm sm:text-base leading-relaxed">
                {t.feedback}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < t.rating
                        ? "text-[#3B38A0] fill-[#3B38A0]"
                        : "text-[#B2B0E8]"
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
