"use client";

import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already given consent
    const hasConsented = localStorage.getItem("cookieConsent");
    if (!hasConsented) {
      setShowConsent(true); // Show the banner if no consent is found
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true"); // Store the user's consent
    setShowConsent(false); // Hide the banner
  };

  if (!showConsent) return null; // If consent is already given, don't render the banner

  return (
    <div
      className="
        fixed bottom-0 left-0 w-full 
        bg-gradient-to-r from-blue-900 to-purple-900 
        text-white p-6 
        z-[9999] flex flex-col sm:flex-row sm:justify-between sm:items-center
        shadow-lg animate-slideUp
      "
    >
      {/* Message Section */}
      <p className="text-sm sm:text-base leading-relaxed text-center sm:text-left">
        We use cookies to enhance your experience and analyze traffic. By continuing to use our site, 
        you consent to our use of cookies. Read more in our{" "}
        <a
          href="/privacy-policy"
          className="underline text-yellow-400 hover:text-yellow-300 transition"
        >
          Privacy Policy
        </a>.
      </p>

      {/* Accept Button */}
      <button
        onClick={handleAccept}
        className="
          mt-4 sm:mt-0 sm:ml-4 px-6 py-2 
          bg-gradient-to-r from-pink-500 to-yellow-500 
          text-white font-bold text-sm sm:text-base 
          rounded-full shadow-lg 
          hover:from-pink-600 hover:to-yellow-600 
          transition-transform transform hover:scale-105
        "
      >
        Accept Cookies
      </button>
    </div>
  );
};

export default CookieConsent;
