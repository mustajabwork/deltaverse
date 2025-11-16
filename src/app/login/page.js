"use client";
import { useState } from "react";

export default function Login() {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_DELTA_PASSWORD) {
      document.cookie = "token=loggedin; path=/";
      window.location.href = "/";
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row gap-2 ">
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-zinc-500 p-2 w-full"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer hover:bg-blue-800 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}
