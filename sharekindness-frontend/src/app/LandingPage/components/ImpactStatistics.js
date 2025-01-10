"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ImpactStatisticsSection = () => {
  const stats = [
    { value: 10000, label: "Donations Made", suffix: "+" },
    { value: 5000, label: "Active Users", suffix: "+" },
    { value: 50, label: "Countries Reached", suffix: "+" },
  ];

  const [animatedStats, setAnimatedStats] = useState(
    stats.map(() => 0) // Start each stat at 0 for the animation
  );

  // Trigger the animation once component mounts
  useEffect(() => {
    const intervals = stats.map((stat, i) =>
      setInterval(() => {
        setAnimatedStats((prevStats) => {
          const newStats = [...prevStats];
          if (newStats[i] < stat.value) {
            newStats[i] += Math.ceil(stat.value / 50); // Increment in steps
          } else {
            clearInterval(intervals[i]);
          }
          return newStats;
        });
      }, 50)
    );

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [stats]);

  return (
    <section className="relative overflow-hidden">
      {/* Wave Decoration Top */}
      <div className="absolute top-0 left-0 w-full h-16 -z-10">
        <WaveTop />
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-green-100 to-green-200" />

      {/* Additional Subtle BG Blur or Shapes */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-100 opacity-20 blur-xl -z-10"
        aria-hidden="true"
      />

      {/* Floating Decorative Blob(s) (Optional) */}
      <motion.div
        className="absolute -top-20 -left-10 w-40 h-40 bg-green-300 rounded-full opacity-50 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-10 w-60 h-60 bg-green-400 rounded-full opacity-50 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-12">
          Our Impact in Numbers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.3 }}
                viewport={{ once: true }}
                className="text-6xl font-extrabold text-green-900"
              >
                {animatedStats[index]}
                {stat.suffix}
              </motion.h3>
              <p className="text-lg text-gray-700 mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave Decoration Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-16 -z-10">
        <WaveBottom />
      </div>
    </section>
  );
};

/** Decorative Wave at the Top */
const WaveTop = () => (
  <svg
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="w-full h-full"
  >
    <path
      fill="#d1fae5" /* Adjust color if desired */
      fillOpacity="1"
      d="M0,32L48,53.3C96,75,192,117,288,144C384,171,480,181,576,170.7C672,160,768,128,864,101.3C960,75,1056,53,1152,85.3C1248,117,1344,203,1392,245.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    />
  </svg>
);

/** Decorative Wave at the Bottom */
const WaveBottom = () => (
  <svg
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
    className="w-full h-full"
  >
    <path
      fill="#d1fae5" /* Adjust color if desired */
      fillOpacity="1"
      d="M0,64L48,74.7C96,85,192,107,288,149.3C384,192,480,256,576,272C672,288,768,256,864,234.7C960,213,1056,203,1152,202.7C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    />
  </svg>
);

export default ImpactStatisticsSection;
