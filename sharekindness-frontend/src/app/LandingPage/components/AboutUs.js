"use client";

import { motion } from "framer-motion";

const AboutUsSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-blue-100 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-pink-600 mb-6">
            Who We Are
          </h2>
          <p className="text-gray-700 text-lg sm:text-xl mb-4 leading-relaxed">
            ShareKindness is a platform that connects generous donors with those in
            need. Our mission is to make giving and receiving as simple as a click
            while spreading compassion and joy.
          </p>
          <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
            Together, we can create a world where kindness knows no bounds.
          </p>
          <motion.button
            className="
              mt-8
              px-8
              py-4
              bg-gradient-to-r
              from-pink-500
              to-yellow-500
              text-white
              text-lg
              font-semibold
              rounded-full
              shadow-md
              hover:scale-105
              hover:shadow-lg
              transition-transform
              duration-300
            "
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="relative w-full max-w-md md:max-w-lg rounded-lg overflow-hidden shadow-xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/about-us.png"
            alt="Who We Are"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
        </motion.div>
      </div>

      {/* Subtle Background Effects */}
      <div
        className="
          absolute
          inset-0
          pointer-events-none
          bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.4),_transparent)]
          opacity-50
          animate-[pulse_8s_infinite]
        "
      ></div>
      <motion.div
        className="absolute -top-20 -right-10 w-40 h-40 bg-pink-300 rounded-full opacity-50 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-20 -left-10 w-60 h-60 bg-blue-300 rounded-full opacity-50 blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      ></motion.div>
    </section>
  );
};

export default AboutUsSection;
