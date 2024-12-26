import { useState, useEffect } from 'react';
import DonationModal from './DonationModal';

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/hero-background.jpeg",
    "/hero-hands.jpeg",
    "/background.svg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change images every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className={`relative z-0 flex items-center justify-center overflow-hidden 
        h-[85vh] md:h-[90vh] xl:h-[90vh] 
        ${currentImageIndex === 0 ? 'bg-contain' : 'bg-cover'} bg-center`}
      style={{
        backgroundImage: `url('${images[currentImageIndex]}')`,
      }}
    >
      {/* Full Gray Background Overlay */}
      <div className="absolute inset-0 bg-gray-900/80"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 max-w-7xl w-full">
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
              Spread Kindness, 
            </span> 
            <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">
              Change Lives
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-gray-200 leading-relaxed">
            Donate items or request help effortlessly. Your small act of charity makes a big impact.
          </p>

          <div className="flex flex-col sm:flex-row mt-8 justify-start gap-4">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg"
            >
              Make a Donation
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg">
              Request Help
            </button>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentImageIndex === index
                ? 'bg-orange-500 scale-125'
                : 'bg-gray-400'
            }`}
          />
        ))}
      </div>

      {isModalOpen && <DonationModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
};

export default HeroSection;
