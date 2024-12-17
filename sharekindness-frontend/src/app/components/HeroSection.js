const HeroSection = () => {
  return (
    <section 
      className="relative h-[600px] sm:h-[700px] lg:h-[800px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-background.jpeg')" }} // Replace with your image path
    >
      {/* Navy Blue Opaque Overlay */}
      <div className="absolute inset-0 bg-blue-900 opacity-60"></div>

      {/* Hero Content */}
      <div className="relative text-center px-4 max-w-2xl">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
          Spread Kindness, Change Lives
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 mb-6 drop-shadow-md">
          Donate items or request help effortlessly. Your small act of kindness makes a big impact.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition">
            Make a Donation
          </button>
          <button className="px-6 py-3 bg-pink-500 text-white font-semibold rounded-full hover:bg-pink-600 transition">
            Request Help
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
