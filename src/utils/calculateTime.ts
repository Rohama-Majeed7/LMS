import humanizeDuration from "humanize-duration";

import { Course } from "@/assets/assets";

// }
export const calculateTime = (course: Course) => {
  const duration = humanizeDuration(
    course.courseContent.reduce(
      (acc, item) =>
        acc +
        item.chapterContent.reduce(
          (acc, item) => acc + item.lectureDuration,
          0
        ),
      0
    ) *
      60 *
      1000,
    {
      units: ["h", "m"],
      round: true,
    }
  );
  return duration;
};
