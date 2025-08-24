import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] my-4 bg-gray-100">
      <SignIn  />
    </div>
  );
}
