import { Course } from "@/assets/assets";

export const calculateRating = (course:Course) => {
  if (course.courseRatings && course.courseRatings.length > 0) {
    const totalRating = course.courseRatings.reduce((acc, r) => acc + r.rating, 0);
    return totalRating / course.courseRatings.length;
  }
  return 0;
}