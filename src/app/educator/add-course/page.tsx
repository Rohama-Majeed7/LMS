"use client";
import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
// import Quill from "quill";

import "quill/dist/quill.snow.css";
import Image from "next/image";
import { assets } from "@/assets/assets";
interface Lecture {
  lectureId: string;
  lectureTitle: string;
  lectureDuration: string;
  lectureUrl: string;
  isPreviewFree: boolean;
}

interface Chapter {
  chapterId: string;
  chapterTitle: string;
  chapterContent: Lecture[];
  collapsed: boolean;
  chapterOrder: number;
}

const Page = () => {
  const qillRef = useRef<any>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [showLectures, setShowLectures] = useState<Record<number, boolean>>({});

  const [lectureDetails, setLectureDetails] = useState<Lecture>({
    lectureId: "",
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

 useEffect(() => {
    (async () => {
      if (!qillRef.current && editorRef.current) {
        const Quill = (await import("quill")).default; // ✅ lazy import
        qillRef.current = new Quill(editorRef.current, {
          theme: "snow",
        });
      }
    })();
  }, []);

  const toggleLectures = (index: number) => {
    setShowLectures((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleChapter = (action: string, chapterId: string) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Title");
      if (!title) return;
      const newChapter = {
        chapterId: uniqid(),
        chapterTitle: title,
        chapterContent: [],
        collapsed: false,
        chapterOrder:
          chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
      };
      setChapters([...chapters, newChapter]);
    } else if (action === "remove") {
      setChapters(chapters.filter((chap) => chap.chapterId !== chapterId));
    }
  };

  const handleLecture = () => {
    if (!currentChapterId) return;

    setChapters((prevChapters) =>
      prevChapters.map((chap) =>
        chap.chapterId === currentChapterId
          ? {
              ...chap,
              chapterContent: [
                ...chap.chapterContent,
                { ...lectureDetails, lectureId: uniqid() },
              ],
            }
          : chap
      )
    );

    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
      lectureId: "",
    });
    setShowPopup(false);
  };

  const onDeleteLecture = (lectureId: string) => {
    if (!currentChapterId) return;
    setChapters((prevChapters) =>
      prevChapters.map((chap) =>
        chap.chapterId === currentChapterId
          ? {
              ...chap,
              chapterContent: chap.chapterContent.filter(
                (lecture) => lecture.lectureId !== lectureId
              ),
            }
          : chap
      )
    );
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className=" w-full sm:py-2 overflow-auto max-h-[900px] h-[90vh] ">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl border-2 border-blue-800 mx-auto space-y-8 bg-white p-6 sm:p-8 md:rounded-2xl md:shadow-xl "
      >
        {/* Title */}
        <div>
          <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
            Course Title
          </p>
          <input
            type="text"
            placeholder="Type here"
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
          />
        </div>

        {/* Description */}
        <div>
          <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
            Course Description
          </p>
          <div
            ref={editorRef}
            className="h-48 border rounded-lg bg-white p-2 shadow-sm"
          ></div>
        </div>

        {/* Price + Thumbnail */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Price */}
          <div>
            <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Course Price ($)
            </p>
            <input
              type="number"
              placeholder="0"
              onChange={(e) => setCoursePrice(parseInt(e.target.value))}
              value={coursePrice}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
              Course Thumbnail
            </p>
            <label
              htmlFor="thumbnailImage"
              className="flex flex-col items-center justify-center border border-dashed rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition"
            >
              {image ? (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="thumbnail"
                  width={150}
                  height={150}
                  className="rounded-lg object-cover shadow-md w-full max-w-[200px]"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <Image
                    src={assets.file_upload_icon}
                    alt="Upload"
                    height={40}
                    width={40}
                  />
                  <p className="text-gray-500 text-sm mt-2 text-center">
                    Click to upload
                  </p>
                </div>
              )}
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>

        {/* Discount */}
        <div>
          <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
            Discount (%)
          </p>
          <input
            required
            value={discount}
            placeholder="0"
            min={0}
            max={100}
            type="number"
            onChange={(e) => setDiscount(parseInt(e.target.value))}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base"
          />
        </div>

        {/* Chapters & Lectures */}
        <div className="space-y-4">
          {chapters.map((chapter, idx) => (
            <div
              key={idx}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm space-y-2"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={assets.dropdown_icon}
                    width={14}
                    height={14}
                    alt=""
                    onClick={() => toggleLectures(idx)}
                    className="cursor-pointer"
                  />
                  <span className="font-medium text-sm sm:text-base">
                    {idx + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs sm:text-sm text-gray-600">
                    {chapter.chapterContent.length} Lectures
                  </span>
                  <Image
                    src={assets.cross_icon}
                    alt=""
                    height={16}
                    width={16}
                    className="cursor-pointer hover:scale-110 transition"
                    onClick={() => handleChapter("remove", chapter.chapterId)}
                  />
                </div>
              </div>

              {showLectures[idx] && (
                <div className="pl-6 space-y-2">
                  {chapter.chapterContent.map((lecture, lectureIdx) => (
                    <div
                      key={lectureIdx}
                      className="flex justify-between items-center text-xs sm:text-sm bg-white p-2 rounded-md shadow-sm border"
                    >
                      <span>
                        {lectureIdx + 1}. {lecture.lectureTitle} -{" "}
                        {lecture.lectureDuration} mins -{" "}
                        <a
                          href={lecture.lectureUrl}
                          className="text-blue-500 underline"
                        >
                          Link
                        </a>{" "}
                        - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                      </span>
                      <Image
                        src={assets.cross_icon}
                        alt=""
                        height={14}
                        width={12}
                        className="cursor-pointer hover:scale-110 transition"
                        onClick={() => onDeleteLecture(lecture.lectureId)}
                      />
                    </div>
                  ))}
                  <div
                    onClick={() => {
                      setCurrentChapterId(chapter.chapterId);
                      setShowPopup(true);
                    }}
                    className="text-blue-500 cursor-pointer hover:underline text-xs sm:text-sm mt-2"
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}

          <div
            onClick={() => handleChapter("add", "")}
            className="text-blue-600 font-medium cursor-pointer hover:underline text-sm sm:text-base"
          >
            + Add Chapter
          </div>
        </div>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <Image
                alt=""
                onClick={() => setShowPopup(false)}
                src={assets.cross_icon}
                width={20}
                height={20}
                className="absolute top-4 right-4 cursor-pointer"
              />
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-1 text-sm sm:text-base">
                    Lecture Title
                  </p>
                  <input
                    type="text"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md text-sm sm:text-base"
                  />
                </div>
                <div>
                  <p className="font-semibold mb-1 text-sm sm:text-base">
                    Duration (minutes)
                  </p>
                  <input
                    type="text"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md text-sm sm:text-base"
                  />
                </div>
                <div>
                  <p className="font-semibold mb-1 text-sm sm:text-base">
                    Lecture Url
                  </p>
                  <input
                    type="text"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-md text-sm sm:text-base"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                  <p className="text-sm sm:text-base">Is Preview Free?</p>
                </div>
                <button
                  onClick={() => handleLecture()}
                  type="button"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
                >
                  Add Lecture
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold text-sm sm:text-base"
        >
          ADD COURSE
        </button>
      </form>
    </div>
  );
};

export default Page;
