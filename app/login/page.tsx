"use client";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE (Brand) */}
      <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold">LMS Platform</h1>
          <p className="mt-4 text-blue-100">
            Learn, Build, and Grow your skills with structured courses.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-6">

        <div className="w-full max-w-md">

          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Welcome Back
          </h2>

          <p className="text-gray-500 mb-6">
            Login to continue your learning
          </p>

          <form className="space-y-4">

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>

          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}