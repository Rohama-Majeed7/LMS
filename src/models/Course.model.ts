import mongoose from "mongoose";
import User from "@/models/User.model";
const lectureSchema = new mongoose.Schema(
  {
    lectureId: {
      type: String,
    },
    lectureTitle: {
      type: String,
    },
    lectureDuration: {
      type: Number,
    },
    lectureUrl: {
      type: String,
    },
    isPreviewFree: {
      type: Boolean,
    },
  },
  { _id: false }
);
const chapterSchema = new mongoose.Schema(
  {
    chapterId: {
      type: String,
    },
    chapterOrder: {
      type: Number,
    },
    chapterTitle: {
      type: String,
    },
    chapterContent: [lectureSchema],
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
    courseDescription: {
      type: String,
      // required: true,
    },
    courseThumbnail: {
      type: String,
    },
    coursePrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    courseContent: [chapterSchema],
    courseRatings: [
      { userId: { type: String }, rating: { type: Number, min: 1, max: 5 } },
    ],
    educator: {
      type: String,
      ref: "User",
    },
    enrolledStudents: [
      {
        type: String,
        ref: "User",
      },
    ],
  },
  { timestamps: true, minimize: false }
);

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
export default Course;
