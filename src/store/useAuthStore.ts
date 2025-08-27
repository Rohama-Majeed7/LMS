import { create } from "zustand";
// ✅ Define store type
interface AuthState {
  isEducator: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
}

// ✅ Zustand store
export const useAuthStore = create<AuthState>((set) => ({
  isEducator: true,
  token: null,
  setEducator: (educator: boolean) => set({ isEducator: educator }),
  setToken: (token: string | null) => {
    set((state) =>{
    console.log("zustand new token:", token);
     return {token}
    });
  },
}));
