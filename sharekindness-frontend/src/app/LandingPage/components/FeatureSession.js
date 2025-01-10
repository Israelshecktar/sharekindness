import { LightBulbIcon, UserGroupIcon, HeartIcon } from "@heroicons/react/24/outline";

const FeaturesSection = () => {
  const features = [
    {
      title: "Effortless Donations",
      description: "List items you no longer need and help others instantly.",
      icon: LightBulbIcon,
    },
    {
      title: "Anonymous Requests",
      description: "Ask for help while maintaining your privacy.",
      icon: UserGroupIcon,
    },
    {
      title: "Track Your Impact",
      description: "Monitor how your contributions make a real difference.",
      icon: HeartIcon,
    },
  ];

  return (
    <section className="relative py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
            Our Features
          </h2>
          <p className="text-gray-600 mt-2 max-w-xl mx-auto">
            Making kindness convenient, one step at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="
                  p-6
                  bg-blue-100
                  border border-blue-200
                  rounded-lg
                  shadow-sm
                  hover:shadow-md
                  transition
                  text-center
                "
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-10 h-10 text-pink-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
