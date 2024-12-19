const HeroSection = () => {
  return (
    <section 
      className="relative z-0 h-[85vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ 
        backgroundImage: "url('/hero-background.jpeg')", 
        backgroundSize: 'contain'
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
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg">
              Make a Donation
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-full hover:scale-105 transition-all shadow-lg">
              Request Help
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
