// components/Loader.tsx
"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <div className="w-12 h-12 border-4 border-[#1A2A80] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
