import Navbar from "@/components/educator/Navbar";
import Sidebar from "@/components/educator/Sidebar";

export default function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="flex">
        <Sidebar />
        {children}
      </main>
    </div>
  );
}
