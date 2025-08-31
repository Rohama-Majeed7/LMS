import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "img.youtube.com", 
      "img.clerk.com",
      "res.cloudinary.com"
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: "10mb", // or larger
    },
  },
};

export default nextConfig;
