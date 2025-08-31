import { create } from "zustand";
import { Course } from "@/assets/assets";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/nextjs";
// ✅ Define store type
interface AuthState {
  isEducator: boolean;
  token: string | null;
  course: Course | null;
  setToken: (token: string | null) => void;
  courses: Course[];
  setCourses: () => void;
  setCourse: (courseId: string) => void;
  setEducator: () => void;
}

// ✅ Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  isEducator: false,
  token: null,
  courses: [],
  course: null,
  setToken: (token: string | null) => {
    set((state) => {
      // console.log("zustand new token:", token);
      return { token };
    });
    course: null;
  },
  setCourses: async () => {
    try {
      const res = await axiosInstance.get("get-all-courses");
      if (res.status === 200) {
        set({ courses: res.data.courses });
      }
    } catch (error) {
      console.log("Error in fetching courses:", error);
    }
  },
  setCourse: async (courseId: string | undefined) => {
    try {
      const res = await axiosInstance.get(`get-all-courses/${courseId}`);
      if (res.status === 200) {
        set({ course: res.data.courseData });
      }
    } catch (error) {
      console.log("Error in fetching single course:", error);
    }
  },
  setEducator: async () => {
    const res = await axiosInstance.get("update-user-role");
    if (res.status === 200) {
      set({isEducator:true})
    }
  },
}));
