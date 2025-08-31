import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token dynamically before each request
axiosInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
