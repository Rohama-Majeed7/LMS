import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import Sidebar from "@/src/components/Sidebar";
import Navbar from "@/src/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LMS Dashboard",
  description: "Learning Management System Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="h-screen overflow-hidden bg-background text-foreground">
        <div className="flex h-screen">

          {/* Sidebar */}
          <aside className="hidden md:flex w-64 border-r border-white/10 bg-white/5 backdrop-blur-md">
            <Sidebar />
          </aside>

          {/* Main Area */}
          <div className="flex flex-1 flex-col">

            {/* Navbar */}
            <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
              <Navbar />
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}