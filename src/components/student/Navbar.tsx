// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { before } from "node:test";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const path = usePathname();
  const pathExists = path.includes("educator");
  const { isEducator, setEducator } = useAuthStore();
  const navigate = useRouter();
  const becomeEducator = () => {
    setEducator();
    if (user?.publicMetadata.role === "educator" && isEducator) {
      navigate.push("/educator");
    } else {
      navigate.push("/");
    }
  };
  return (
    <nav
      className={`shadow-md ${pathExists ? "bg-white hidden" : "bg-[#1A2A80]"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-white">
              <Image
                src={assets.logo_dark}
                alt="LMS-logo"
                height={100}
                width={100}
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {user && (
              <>
                <button
                  onClick={becomeEducator}
                  className="text-white hover:text-[#B2B0E8]"
                >
                  {isEducator ? "Educator Dashboard" : "Become Educator"}
                </button>
                <Link
                  href="/student/my-enrollments"
                  className="text-white hover:text-[#B2B0E8]"
                >
                  My Enrollments
                </Link>
              </>
            )}
            {user ? (
              <UserButton />
            ) : (
              <Link
                href={"/sign-in"}
                className="px-4 py-2 rounded-lg bg-[#3B38A0] text-white hover:bg-[#7A85C1] transition"
              >
                Create Account
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden md:hidden bg-[#ffffff] shadow-md"
          >
            <div className="px-4 py-3 flex flex-col gap-3">
              {user ? (
                <UserButton />
              ) : (
                <Link
                  href={"/sign-in"}
                  className="px-4 py-2 rounded-lg bg-[#3B38A0] text-white hover:bg-[#7A85C1] transition"
                >
                  Create Account
                </Link>
              )}
              <button
                onClick={() => navigate.push("/educator")}
                className="text-left text-[#3B38A0] hover:text-[#B2B0E8]"
              >
                {user ? "Educator Dashboard" : "Become Educator"}
              </button>
              <Link
                href="/student/my-enrollments"
                className="text-[#3B38A0] hover:text-[#B2B0E8]"
              >
                My Enrollments
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </nav>
  );
}
