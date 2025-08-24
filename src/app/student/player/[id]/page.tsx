"use client";
import { assets, Course, dummyCourses, Lecture } from "@/assets/assets";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Rating from "@/components/student/Rating";

const Page = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<Course>();
  const [showLectures, setShowLectures] = useState<Record<number, boolean>>({});
  const [playerData, setPlayerData] = useState<Lecture>();

  const fetchCourseDetails = async () => {
    const foundCourse = dummyCourses.find((c) => c._id === id);
    if (foundCourse) setCourse(foundCourse);
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
    <section className="px-4 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Content */}
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A2A80] mb-3">
            {course?.courseTitle}
          </h1>

          {/* Course Structure */}
          <h2 className="text-xl md:text-2xl font-semibold text-[#3B38A0] mb-4">
            Course Structure
          </h2>

          <div>
            {course?.courseContent.map((chapter, idx) => (
              <div
                key={idx}
                className="mb-5 border rounded-xl p-4 bg-[#f9f9ff] hover:bg-[#f1f1ff] transition"
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
                    <h3 className="font-medium text-gray-800 text-sm md:text-base">
                      {chapter.chapterTitle}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <p className="text-gray-600 text-xs md:text-sm">
                      {chapter.chapterContent.length} Lectures
                    </p>
                    <p>
                      {" "}
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
                          src={false ? assets.blue_tick_icon : assets.play_icon}
                          height={20}
                          width={20}
                          alt="play-icon"
                        />
                        <p className="text-gray-700">{lecture.lectureTitle}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {lecture.lectureUrl && (
                          <span
                            onClick={() => setPlayerData(lecture)}
                            className="text-[#3B38A0] font-medium cursor-pointer hover:underline"
                          >
                            Watch
                          </span>
                        )}
                        <p className="text-gray-500 text-xs md:text-sm">
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
          <h3>Course Rating</h3>
          <Rating initialRating={0} />
        </div>

        {/* Right Sidebar */}
        <aside className="bg-white border rounded-lg shadow-lg p-6 h-fit">
          {/* Thumbnail / Player */}
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="rounded-lg w-full aspect-video"
              />
              <div className="mt-4 flex justify-between md:flex-row flex-col items-center">
                <p className="font-semibold text-gray-800 mb-2">
                  {playerData.lectureOrder}. {playerData.lectureTitle}
                </p>
                <button className="px-4 py-2 bg-[#1A2A80] text-white rounded-lg text-sm md:text-base hover:bg-[#3B38A0] transition">
                  Mark Complete
                </button>
              </div>
            </div>
          ) : (
            <Image
              src={course?.courseThumbnail || ""}
              alt="course-thumbnail"
              width={500}
              height={300}
              className="rounded-lg mb-4 w-full object-cover"
            />
          )}
        </aside>
      </div>
    </section>
  );
};

export default Page;
