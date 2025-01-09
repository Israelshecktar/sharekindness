"use client";

import { useRouter } from "next/navigation";

const LandingHeader = () => {
  const router = useRouter();

  return (
    <header
      className="
        w-full
        fixed
        top-0
        z-50
        bg-gradient-to-r
        from-pink-500
        to-yellow-500
        text-white
        shadow-md
        p-4
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Branding */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}>
          <img
            src="/ShareKindness-Logo.png"
            alt="ShareKindness Logo"
            className="
              w-10 h-10 sm:w-12 sm:h-12
              transition-transform
              duration-200
              hover:scale-105
            "
          />
          <h1
            className="
              text-xl sm:text-2xl
              font-bold
              tracking-wide
              bg-clip-text
              text-transparent
              bg-gradient-to-r
              from-white
              to-yellow-300
            "
          >
            ShareKindness
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm sm:text-base font-medium">
          <button
            onClick={() => router.push("/auth")}
            className="
              px-4 py-2
              bg-white
              text-pink-600
              rounded-full
              shadow-md
              hover:bg-pink-600 hover:text-white
              transition
            "
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/auth?register=true")}
            className="
              px-4 py-2
              bg-yellow-400
              text-pink-800
              rounded-full
              shadow-md
              hover:bg-pink-500 hover:text-white
              transition
            "
          >
            Register
          </button>
        </nav>
      </div>
    </header>
  );
};

export default LandingHeader;
