const FAQsSection = () => {
    const faqs = [
      {
        question: "How do I donate an item?",
        answer: "Sign up, list your item, and connect with those in need.",
      },
      {
        question: "Is the platform free to use?",
        answer: "Yes, ShareKindness is completely free for all users.",
      },
      {
        question: "How do I contact a donor or recipient?",
        answer:
          "After connecting through the platform, you can securely communicate with them.",
      },
    ];
  
    return (
      <section className="py-12 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-indigo-600 text-center mb-8">
            Got Questions? We’ve Got Answers
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                <p className="text-gray-600 mt-2">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQsSection;
  