"use client";

import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    name: "Abdulwasiu Opeyemi",
    image: "/testimonials/ope.jpg",
    quote: "This platform has completely changed the way I give back to my community. It’s so easy to use!",
    role: "Donor",
    rating: 5,
  },
  {
    name: "Phillips Jethro",
    image: "/testimonials/jethro.jpg",
    quote: "I found exactly what I needed in just a few clicks. This app is a lifesaver!",
    role: "Recipient",
    rating: 4.5,
  },
  {
    name: "Adedoyin Adelowo",
    image: "/testimonials/doyin.jpg",
    quote: "The best part is seeing how my donations make a difference. Thank you ShareKindness!",
    role: "Donor",
    rating: 5,
  },
];

const TestimonialSection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Users</span> Say
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
          Hear from our donors and recipients who have experienced the power of kindness.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-transform transform hover:scale-105 flex flex-col items-center text-center"
            >
              <img
                src={testimonial.image}
                alt={`${testimonial.name}'s photo`}
                className="w-24 h-24 rounded-full border-2 border-pink-500 mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500 italic mb-4">{testimonial.role}</p>
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center justify-center">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-500" />
                ))}
                {testimonial.rating % 1 ? (
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
