"use client";

import { useRouter } from "next/navigation";

const LandingHeader = () => {
  const router = useRouter();

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        bg-gradient-to-r
        from-pink-500
        to-yellow-500
        text-white
        shadow-md
      "
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-2">
          {/* Logo & Branding */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <img
              src="/ShareKindness-Logo.png"
              alt="ShareKindness Logo"
              className="
                w-9 h-9
                sm:w-10 sm:h-10
                md:w-12 md:h-12
                transition-transform
                duration-200
                hover:scale-105
                flex-shrink-0
              "
            />
            <h1
              className="
                text-sm
                sm:text-xl
                md:text-2xl
                font-extrabold
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

          {/* Single CTA Button */}
          <button
            onClick={() => router.push("/auth")}
            className="
              px-4
              py-2
              bg-white
              text-pink-600
              rounded-full
              shadow-lg
              font-semibold
              hover:bg-pink-600
              hover:text-white
              hover:shadow-xl
              transition
              duration-300
              text-xs
              sm:text-sm
              md:text-base
            "
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
