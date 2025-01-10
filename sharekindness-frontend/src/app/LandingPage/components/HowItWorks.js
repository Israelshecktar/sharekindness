"use client";

import { motion } from "framer-motion";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: "/icons/signup.svg",
      title: "Sign Up or Log In",
      description: "Create an account or log in to get started.",
    },
    {
      icon: "/icons/browse.svg",
      title: "Browse Donations",
      description: "Explore items listed by kind-hearted donors or request help.",
    },
    {
      icon: "/icons/transaction.svg",
      title: "Complete Transactions",
      description: "Connect with donors or recipients and make a difference.",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 to-blue-100" />

      {/* Decorative Circles */}
      <div
        className="absolute inset-0 flex justify-center items-center pointer-events-none -z-10"
        aria-hidden="true"
      >
        <div className="w-64 h-64 bg-blue-200 rounded-full absolute top-12 left-8 blur-3xl opacity-50" />
        <div className="w-48 h-48 bg-blue-300 rounded-full absolute bottom-16 right-16 blur-3xl opacity-50" />
      </div>

      {/* Wave Decoration (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-32 -z-10">
        <WaveBottom />
      </div>

      <div className="relative max-w-7xl mx-auto py-16 px-6 text-center">
        <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500 mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="
                flex flex-col items-center
                text-center
                bg-white p-8
                rounded-xl shadow-lg
                hover:shadow-2xl
                transform hover:scale-105
                transition-transform
              "
            >
              <div className="w-20 h-20 mb-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full">
                <img src={step.icon} alt={step.title} className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/** 
 * Optional: Decorative Wave at the bottom.
 * Adjust the fill color to suit your design.
 */
const WaveBottom = () => (
  <svg
    className="w-full h-full"
    viewBox="0 0 1440 320"
    preserveAspectRatio="none"
  >
    <path
      fill="#ebf8ff"
      fillOpacity="1"
      d="M0,288L40,272C80,256,160,224,240,192C320,160,400,128,480,144C560,160,640,224,720,213.3C800,203,880,117,960,74.7C1040,32,1120,32,1200,42.7C1280,53,1360,75,1400,85.3L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
    />
  </svg>
);

export default HowItWorksSection;
