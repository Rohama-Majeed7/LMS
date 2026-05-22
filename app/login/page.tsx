"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   body: JSON.stringify({ email, password }),
    // });

    // if (res.ok) {
    //   router.push("/dashboard");
    // }
  }

  return (
    <div className="flex h-screen items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>

      </div>
    </div>
  );
}