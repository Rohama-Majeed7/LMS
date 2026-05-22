"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [role, setRole] = useState("STUDENT");

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
            className={`flex-1 py-2 rounded ${
              role === "STUDENT"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Student
          </button>

          <button
            onClick={() => setRole("TEACHER")}
            className={`flex-1 py-2 rounded ${
              role === "TEACHER"
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            Teacher
          </button>

        </div>

        <form className="space-y-4">

          {/* COMMON FIELDS */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
          />

          {/* TEACHER ONLY FIELDS */}
          {role === "TEACHER" && (
            <>
              <textarea
                placeholder="Short Bio"
                className="w-full border p-3 rounded"
              />

              <input
                type="text"
                placeholder="Skills (e.g. React, Node.js)"
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