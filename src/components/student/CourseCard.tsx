"use client";

import Image from "next/image";
import { assets } from "@/assets/assets";
import { Course } from "@/assets/assets";
import { calculateRating } from "@/utils/calculateRating";
import Link from "next/link";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const rating = calculateRating(course);

  return (
    <Link href={`/student/course-list/${course._id}`} className="no-underline">
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg hover:bg-[#F3F4FF] transition max-w-xs">
      {/* Thumbnail */}
      <div className="relative w-full h-40">
        <Image
          src={course.courseThumbnail}
          alt={course.courseTitle}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-[#1A2A80] mb-1 line-clamp-2">
          {course.courseTitle}
        </h3>

        {/* Educator */}
        <p className="text-xs sm:text-sm text-[#7A85C1] mb-2">
          By {course.educator}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3 text-[#3B38A0] text-sm sm:text-base">
          <p>{rating}</p>
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src={i < Math.round(rating) ? assets.star : assets.star_blank}
              alt="rating"
              width={18}
              height={18}
            />
          ))}
          <p>({course.courseRatings.length})</p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-[#3B38A0]">
            ${course.discount}
          </span>
          <span className="text-xs sm:text-sm text-[#B2B0E8] line-through">
            ${course.coursePrice}
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
}
