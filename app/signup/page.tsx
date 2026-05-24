"use client";

import { useState } from "react";
import Link from "next/link";
import { signup } from "@/src/apis/auth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
export default function SignupPage() {
  const [role, setRole] = useState("STUDENT");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    skills: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "TEACHER" && (!formData.name || !formData.email || !formData.password || !formData.bio || !formData.skills)) {
      alert("Please fill in all fields for teachers.");
      return;
    }
    if (role === "STUDENT" && (!formData.name || !formData.email || !formData.password)) {
      alert("Please fill in all fields for students.");
      return;
    }
    try {
      const response = await signup(formData.name, formData.email, formData.password, role, formData.bio, formData.skills);
      alert(response?.message);
    } catch (error:any) {
      console.error("Signup error:", error);
       const message =
    error?.response?.data?.message || "Signup failed. Please try again.";
      alert( message || "Signup failed. Please try again.");
    }
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        {/* ROLE SELECTOR */}
        <div className="flex gap-2 mb-6">

          <button
            onClick={() => setRole("STUDENT")}
            className={`flex-1 py-2 rounded ${role === "STUDENT"
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
              }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("TEACHER")}
            className={`flex-1 py-2 rounded ${role === "TEACHER"
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
              }`}
          >
            Teacher
          </button>

        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* COMMON FIELDS */}
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border p-3 rounded pr-10"
            />

            <button
              type="button"
              onClick={handleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* TEACHER ONLY FIELDS */}
          {role === "TEACHER" && (
            <>
              <textarea
                placeholder="Short Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                placeholder="Skills (e.g. React, Node.js)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border p-3 rounded"
              />
            </>
          )}

          <button className="w-full bg-blue-600 text-white py-3 rounded">
            Sign Up as {role}
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Already have account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}