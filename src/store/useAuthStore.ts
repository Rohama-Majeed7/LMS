import { create } from "zustand";
import { Course } from "@/assets/assets";

// ✅ Define store type
interface AuthState {
  isEducator:boolean;
}

// ✅ Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  isEducator:true,
  setEducator: (educator:boolean) => set({ isEducator:educator }),
}));
