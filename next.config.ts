import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "img.youtube.com", // ✅ allow YouTube thumbnails
      "img.clerk.com",   // ✅ since you’re also loading Clerk images
    ],
  },
  
};

export default nextConfig;
