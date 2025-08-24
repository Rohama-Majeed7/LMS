"use client";
import { assets, Course, dummyCourses } from "@/assets/assets";
import { calculateRating } from "@/utils/calculateRating";
import { calculateTime } from "@/utils/calculateTime";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
const Page = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const rating = course ? calculateRating(course) : 0;
  const [showLectures, setShowLectures] = useState<Record<number, boolean>>({});
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState<{
    videoId: string | undefined;
  } | null>(null);
  const fetchCourseDetails = async () => {
    const course = dummyCourses.find((course) => course._id === id);
    if (course) setCourse(course);
  };

  const toggleLectures = (index: number) => {
    setShowLectures((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  return (
    <section className="px-4 py-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-6 md:p-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A2A80] mb-3">
            {course?.courseTitle}
          </h1>

          {/* Short Description */}
          <p
            className="text-gray-600 text-sm md:text-base mb-4"
            dangerouslySetInnerHTML={{
              __html: course?.courseDescription.slice(0, 200) || "",
            }}
          ></p>

          {/* Rating & Stats */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-sm md:text-base">
            <div className="flex items-center gap-1 text-[#3B38A0] font-medium">
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
              <p>({course?.courseRatings.length})</p>
            </div>
            <p className="text-gray-500">
              {course?.enrolledStudents.length} Students
            </p>
          </div>

          {/* Course Structure */}
          <h2 className="text-xl md:text-2xl font-semibold text-[#1A2A80] mb-4">
            Course Structure
          </h2>

          <div>
            {course?.courseContent.map((chapter, idx) => (
              <div
                key={idx}
                className="mb-5 border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition"
              >
                {/* Chapter Header */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleLectures(idx)}
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={assets.down_arrow_icon}
                      height={14}
                      width={14}
                      alt="arrow-down"
                      className={`transition-transform duration-300 ${
                        showLectures[idx] ? "rotate-180" : ""
                      }`}
                    />
                    <h3 className="font-medium text-gray-800">
                      {chapter.chapterTitle}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {chapter.chapterContent.length} Lectures •{" "}
                    {/* {calculateTime(chapter)} */}
                    {humanizeDuration(
                      chapter.chapterContent.reduce(
                        (acc, item) => acc + item.lectureDuration,
                        0
                      ) *
                        60 *
                        1000,
                      {
                        units: ["h", "m"],
                        round: true,
                      }
                    )}
                  </p>
                </div>

                {/* Lectures */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    showLectures[idx] ? "max-h-96 mt-3" : "max-h-0"
                  }`}
                >
                  {chapter.chapterContent.map((lecture) => (
                    <div
                      key={lecture.lectureId}
                      className="flex justify-between items-center py-2 px-2 border-b last:border-0 text-sm md:text-base"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={assets.play_icon}
                          height={20}
                          width={20}
                          alt="play-icon"
                        />
                        <p className="text-gray-700">{lecture.lectureTitle}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {lecture.isPreviewFree && (
                          <span
                            onClick={() =>
                              setPlayerData({
                                videoId:
                                  lecture &&
                                  lecture.lectureUrl.split("/").pop(),
                              })
                            }
                            className="text-[#3B38A0] font-medium cursor-pointer"
                          >
                            Preview
                          </span>
                        )}
                        <p className="text-gray-500 text-sm">
                          {humanizeDuration(
                            lecture.lectureDuration * 60 * 1000,
                            { units: ["h", "m"], round: true }
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Course Description */}
          <div className="mt-8">
            <h2 className="text-xl md:text-2xl font-semibold text-[#1A2A80] mb-3">
              Course Description
            </h2>
            <p
              className="text-gray-600 leading-relaxed text-sm md:text-base max-h-[200px] overflow-auto"
              dangerouslySetInnerHTML={{
                __html: course?.courseDescription || "",
              }}
            ></p>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="bg-white border rounded-lg shadow-lg p-6 h-fit">
          {/* Thumbnail */}
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{
                playerVars: {
                  autoplay: 1,
                },
              }}
              iframeClassName="rounded-lg w-full aspect-video"
            />
          ) : (
            <Image
              src={course?.courseThumbnail || ""}
              alt="course-thumbnail"
              width={500}
              height={300}
              className="rounded-lg mb-4 w-full object-cover"
            />
          )}
          {/* Price */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-2xl font-bold text-[#1A2A80]">
              ${course?.discount}
            </p>
            <p className="text-lg text-gray-400 line-through">
              ${course?.coursePrice}
            </p>
            <p>
              {Math.floor(
                ((course?.discount || 0) / (course?.coursePrice || 0)) * 100
              )}{" "}
              % off
            </p>
          </div>

          {/* Meta Info */}
          <ul className="space-y-2 text-sm text-gray-600 mb-6">
            <li>📚 {course?.courseContent.length} Chapters</li>
            <li>
              🎥{" "}
              {course?.courseContent.reduce(
                (acc, c) => acc + c.chapterContent.length,
                0
              )}{" "}
              Lessons
            </li>
            <li>⭐ {rating.toFixed(1)} Average Rating</li>
            <li>
              ⏱️{" "}
              {course
                ? humanizeDuration(
                    course.courseContent.reduce(
                      (acc, c) =>
                        acc +
                        c.chapterContent.reduce(
                          (sum, l) => sum + l.lectureDuration,
                          0
                        ),
                      0
                    ) *
                      60 *
                      1000,
                    { units: ["h", "m"], round: true }
                  )
                : "N/A"}
            </li>
          </ul>

          {/* Enroll Button */}
          <button className="w-full bg-[#1A2A80] text-white py-3 rounded-lg font-semibold hover:bg-[#3B38A0] transition mb-6">
            {alreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
          </button>

          {/* What's in this Course */}
          <h3 className="text-lg font-semibold mb-3 text-[#1A2A80]">
            What’s in this course
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li>Lifetime access to all lectures</li>
            <li>Certificate of completion</li>
            <li>Access on mobile & desktop</li>
            <li>Assignments & quizzes</li>
            <li>Community support</li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default Page;
