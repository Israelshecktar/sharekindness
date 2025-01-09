"use client";

import { LightBulbIcon, UserGroupIcon, HeartIcon } from "@heroicons/react/24/outline";

const FeatureSection = () => {
  const features = [
    {
      title: "Effortless Donations",
      description: "Easily list items you no longer need and help others.",
      icon: <LightBulbIcon className="w-10 h-10 text-pink-500" />,
    },
    {
      title: "Anonymous Requests",
      description: "Request items or assistance while maintaining your privacy.",
      icon: <UserGroupIcon className="w-10 h-10 text-yellow-500" />,
    },
    {
      title: "Track Your Impact",
      description: "See how your acts of kindness are making a difference.",
      icon: <HeartIcon className="w-10 h-10 text-green-500" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">ShareKindness</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Discover how we make donating and requesting help seamless, impactful, and accessible to everyone.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
