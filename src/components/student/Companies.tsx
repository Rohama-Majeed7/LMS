// components/TrustedBy.tsx
"use client";

import Image from "next/image";
import { assets } from "@/assets/assets"; // adjust path as per your setup

export default function Companies() {
  return (
    <section className="bg-[#F9FAFB] py-12 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-[#1A2A80] text-base sm:text-lg md:text-2xl font-semibold mb-8">
          Trusted by learners from top companies
        </h2>

        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-center">
          <Image
            src={assets.microsoft_logo}
            alt="Microsoft"
            width={100}
            height={100}
            className="mx-auto opacity-70 hover:opacity-100 transition"
          />
          <Image
            src={assets.accenture_logo}
            alt="Accenture"
            width={100}
            height={100}
            className="mx-auto opacity-70 hover:opacity-100 transition"
          />
          <Image
            src={assets.paypal_logo}
            alt="PayPal"
            width={100}
            height={100}
            className="mx-auto opacity-70 hover:opacity-100 transition"
          />
          <Image
            src={assets.adobe_logo}
            alt="Adobe"
            width={100}
            height={100}
            className="mx-auto opacity-70 hover:opacity-100 transition"
          />
          <Image
            src={assets.walmart_logo}
            alt="Walmart"
            width={100}
            height={100}
            className="mx-auto opacity-70 hover:opacity-100 transition"
          />
        </div>
      </div>
    </section>
  );
}
