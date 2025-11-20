"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

const Login = () => {
  const [password, setPassword] = useState("");
  const [redirectTo, setRedirectTo] = useState("/");
  const searchParams = useSearchParams();

  useEffect(() => {
    const redirectParam = searchParams.get("redirectTo");
    if (redirectParam) setRedirectTo(redirectParam);
  }, [searchParams]);

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_DELTA_PASSWORD) {
      // browser-only code is fine here
      document.cookie = "token=loggedin; path=/";
      window.location.href = redirectTo;
    } else {
      alert("Wrong password!");
      setPassword("");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-[#FFCCAF] ${bebas.className}`}
    >
      <div className="w-80 sm:w-96 p-10 bg-[#FFDDB5] rounded-3xl shadow-lg flex flex-col items-center border border-[#E6B98B]">
        <h1 className="text-5xl sm:text-6xl text-[#5C4033] mb-6">Delta</h1>
        <p className="text-lg text-[#5C4033] mb-6 text-center">
          Enter your password
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl border border-[#BFA17A] text-[#5C4033] placeholder-[#A67C52] font-medium text-lg focus:outline-none focus:ring-2 focus:ring-[#BFA17A] mb-3"
        />
        <button
          onClick={handleLogin}
          className="w-full py-3 mt-2 bg-[#BFA17A] text-white font-semibold rounded-xl text-lg hover:bg-[#A67C52] transition-colors font-sans"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
