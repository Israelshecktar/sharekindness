import { useState, useEffect } from "react";
import DonationModal from "./DonationModal";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/hero-background.jpeg",
    "/hero-hands.jpeg",
    "/background.svg",
  ];

  // Auto-rotate hero images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`
        relative
        z-0
        flex
        items-center
        justify-center
        overflow-hidden
        h-[85vh]
        md:h-[90vh]
        xl:h-[90vh]
        transition-all
        ${
          currentImageIndex === 0 ? "bg-contain" : "bg-cover"
        } bg-center animate-fadeIn
      `}
      style={{
        backgroundImage: `url('${images[currentImageIndex]}')`,
      }}
    >
      {/* Semi-transparent overlay for improved text contrast */}
      <div
        className="
          absolute
          inset-0
          bg-gray-900/70
          backdrop-blur-sm
          animate-fadeIn
        "
      />

      {/* Hero Content */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          px-6
          max-w-7xl
          w-full
          animate-slideUpSlow
        "
      >
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1
            className="
              text-5xl
              sm:text-6xl
              lg:text-7xl
              font-extrabold
              text-white
              leading-tight
              drop-shadow-xl
            "
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
              Spread Kindness,
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              Change Lives
            </span>
          </h1>

          {/* Optional Tagline / Subheading */}
          <p
            className="
              mt-3
              text-lg
              sm:text-xl
              lg:text-2xl
              text-gray-100
              italic
            "
          >
            “A simple act of generosity can transform someone’s day.”
          </p>

          {/* Supporting Paragraph */}
          <p
            className="
              mt-4
              text-sm
              sm:text-base
              lg:text-lg
              text-gray-200
              max-w-2xl
            "
          >
            Donate items or request help effortlessly. Your small act of charity
            makes a big impact—one gift at a time.
          </p>

          <div className="flex flex-col sm:flex-row mt-8 gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="
                px-8
                py-4
                bg-gradient-to-r
                from-pink-500
                to-yellow-500
                text-white
                font-semibold
                rounded-full
                hover:scale-105
                hover:shadow-2xl
                transition-transform
                duration-300
                shadow-lg
              "
            >
              Make a Donation
            </button>
            <button
              className="
                px-8
                py-4
                bg-gradient-to-r
                from-blue-500
                to-green-500
                text-white
                font-semibold
                rounded-full
                hover:scale-105
                hover:shadow-2xl
                transition-transform
                duration-300
                shadow-lg
              "
            >
              Request Help
            </button>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          flex
          space-x-3
          animate-fadeIn
        "
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`
              w-3
              h-3
              rounded-full
              transition-transform
              duration-300
              ${
                currentImageIndex === index
                  ? "bg-orange-500 scale-150"
                  : "bg-gray-400 hover:scale-110"
              }
            `}
          />
        ))}
      </div>

      {/* Donation Modal */}
      {isModalOpen && <DonationModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default HeroSection;