"use client"
import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-[#1A2A80] text-white w-full px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={assets.logo_dark}
            alt="logo"
            height={50}
            width={120}
            className="cursor-pointer"
            priority
          />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <p className="hidden sm:block text-sm md:text-base">
            Hi! <span className="font-semibold">{user ? user.fullName : "Developer"}</span>
          </p>
          
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Image
              src={assets.profile_img}
              alt="profile"
              height={40}
              width={40}
              className="rounded-full cursor-pointer border border-white"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
