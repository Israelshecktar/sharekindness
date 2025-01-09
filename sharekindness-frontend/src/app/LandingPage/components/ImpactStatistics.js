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
    stats.map(() => 0) // Initial state for animation
  );

  // Trigger the animation once the component is mounted
  useEffect(() => {
    const intervals = stats.map((stat, i) =>
      setInterval(() => {
        setAnimatedStats((prevStats) => {
          const newStats = [...prevStats];
          if (newStats[i] < stat.value) {
            newStats[i] += Math.ceil(stat.value / 50); // Increment value
          } else {
            clearInterval(intervals[i]); // Clear the interval once complete
          }
          return newStats;
        });
      }, 50)
    );

    return () => intervals.forEach((interval) => clearInterval(interval)); // Cleanup
  }, [stats]);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-green-100 to-green-200 relative overflow-hidden">
      {/* Background effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-100 opacity-20 blur-xl"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-12">
          Our Impact in Numbers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.3 }}
                className="text-6xl font-extrabold text-green-900"
              >
                {animatedStats[index]}
                {stats[index].suffix}
              </motion.h3>
              <p className="text-lg text-gray-700 mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStatisticsSection;
