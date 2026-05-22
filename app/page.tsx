import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* NAVBAR */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5 border-b">

        <h1 className="text-xl font-bold text-blue-600">
          LMS Platform
        </h1>

        <nav className="flex gap-4 text-sm items-center">
          <Link href="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </nav>

      </header>

      {/* HERO SECTION */}
      <section className="px-6 md:px-12 py-20 flex flex-col items-center text-center bg-gradient-to-b from-blue-50 to-white">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 max-w-3xl">
          Learn Skills Faster with Our Modern LMS Platform
        </h2>

        <p className="mt-6 text-gray-500 max-w-2xl">
          Join thousands of learners. Access structured courses, track progress,
          and build real-world skills with our smart learning system.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Start Learning
          </Link>

          <Link
            href="/login"
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="px-6 md:px-12 py-16 bg-gray-50">

        <h3 className="text-2xl font-bold text-center mb-10">
          Why Choose Our LMS?
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h4 className="font-semibold text-lg mb-2">📚 Structured Learning</h4>
            <p className="text-gray-500 text-sm">
              Well organized courses with lessons and progress tracking.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h4 className="font-semibold text-lg mb-2">⚡ Fast & Simple</h4>
            <p className="text-gray-500 text-sm">
              Lightweight system built for speed and ease of use.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h4 className="font-semibold text-lg mb-2">🎯 Real Projects</h4>
            <p className="text-gray-500 text-sm">
              Learn by building real-world projects and assignments.
            </p>
          </div>

        </div>

      </section>

      {/* COURSES PREVIEW */}
      <section className="px-6 md:px-12 py-16">

        <h3 className="text-2xl font-bold text-center mb-10">
          Popular Courses
        </h3>

        <div className="grid md:grid-cols-3 gap-6">

          {[
            {
              title: "Next.js Mastery",
              desc: "Learn modern React & Next.js from scratch",
            },
            {
              title: "Prisma ORM",
              desc: "Master database handling with Prisma",
            },
            {
              title: "Full Stack LMS",
              desc: "Build complete learning management system",
            },
          ].map((course, i) => (
            <div
              key={i}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-semibold text-lg">{course.title}</h4>
              <p className="text-gray-500 text-sm mt-2">
                {course.desc}
              </p>

              <button className="mt-4 text-blue-600 text-sm hover:underline">
                View Course →
              </button>
            </div>
          ))}

        </div>

      </section>

      {/* CTA SECTION */}
      <section className="bg-blue-600 text-white text-center py-20 px-6">

        <h3 className="text-3xl font-bold">
          Start Your Learning Journey Today
        </h3>

        <p className="mt-4 text-blue-100">
          Join now and build your future skills with our LMS.
        </p>

        <Link
          href="/signup"
          className="inline-block mt-6 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Get Started
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-500 text-sm py-6 border-t">
        © {new Date().getFullYear()} LMS Platform. All rights reserved.
      </footer>

    </div>
  );
}