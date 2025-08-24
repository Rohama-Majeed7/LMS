"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900  border-white text-[#B2B0E8] py-8 px-2">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo & About */}
        <div className="flex flex-col items-start space-y-4">
          <Image src={assets.logo_dark} height={100} width={100} alt="logo" />
          <p className="text-sm text-[#F3F4FF]">
            Learn new skills anytime, anywhere with our LMS platform. 
            Join thousands of learners and upgrade your career.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-[#F3F4FF] transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-[#F3F4FF] transition">
                Courses
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#F3F4FF] transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#F3F4FF] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
          <p className="text-sm text-[#F3F4FF] mb-4">
            Get the latest courses and updates directly in your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-stretch gap-3">
            {/* Email Input */}
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-lg text-[#ffffff] outline-none border border-[#7A85C1] focus:ring-2 focus:ring-[#3B38A0]"
              required
            />
            <button
              type="submit"
              className="bg-[#3B38A0] px-6 py-2 rounded-lg text-white font-medium hover:bg-[#7A85C1] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3B38A0] mt-10 pt-6 text-center text-[#B2B0E8] text-sm">
        © {new Date().getFullYear()} LMS. All rights reserved.
      </div>
    </footer>
  );
}
