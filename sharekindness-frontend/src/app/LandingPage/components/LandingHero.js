import { useState, useEffect } from "react";

const LandingHero = ({ onAuthAction }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/auth-hero-1.jpg",
    "/auth-hero-2.jpg",
    "/auth-hero-3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
        relative
        z-0
        flex
        items-center
        justify-center
        overflow-hidden
        bg-cover
        bg-center
        // Height for mobile vs. larger screens
        h-[65vh]
        sm:h-[85vh]
      "
      style={{
        backgroundImage: `url('${images[currentImageIndex]}')`,
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-3xl">
        <h1
          className="
            text-3xl
            sm:text-5xl
            font-extrabold
            text-white
            leading-tight
          "
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
            Join the Movement,
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
            Share Kindness
          </span>
        </h1>

        <p className="mt-3 sm:mt-4 text-base sm:text-xl text-gray-200 italic">
          “Kindness starts with a small step.”
        </p>
        <p className="mt-3 sm:mt-4 text-xs sm:text-base text-gray-300 max-w-2xl mx-auto">
          Sign up or log in to start sharing and receiving help in your community.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => onAuthAction("login")}
            className="
              px-6 py-3
              bg-gradient-to-r
              from-pink-500
              to-yellow-500
              text-white
              font-semibold
              rounded-full
              hover:scale-105
              hover:shadow-xl
              transition-transform
              duration-300
              shadow-lg
              text-sm
              sm:text-base
            "
          >
            Log In
          </button>
          <button
            onClick={() => onAuthAction("register")}
            className="
              px-6 py-3
              bg-gradient-to-r
              from-blue-500
              to-green-500
              text-white
              font-semibold
              rounded-full
              hover:scale-105
              hover:shadow-xl
              transition-transform
              duration-300
              shadow-lg
              text-sm
              sm:text-base
            "
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`
              w-3 h-3
              rounded-full
              transition-transform
              ${
                currentImageIndex === index
                  ? "bg-orange-500 scale-150"
                  : "bg-gray-400 hover:scale-110"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default LandingHero;
