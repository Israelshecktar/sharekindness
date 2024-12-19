import { useState } from "react";
import { HomeIcon, GiftIcon, UserIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("My Donations"); // Track the active tab

  return (
    <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 w-full sm:relative">
      {/* Navigation Links (Visible on smaller screens) */}
      <nav className="flex justify-around sm:hidden">
        <a href="#" className="flex flex-col items-center text-sm hover:text-gray-400 transition">
          <HomeIcon className="w-6 h-6 mb-1" />
          <span>Home</span>
        </a>
        <a href="#" className="flex flex-col items-center text-sm hover:text-gray-400 transition">
          <GiftIcon className="w-6 h-6 mb-1" />
          <span>Donations</span>
        </a>
        {/* Profile Button */}
        <button
          onClick={() => setIsProfileOpen(true)}
          className="flex flex-col items-center text-sm hover:text-gray-400 transition"
        >
          <UserIcon className="w-6 h-6 mb-1" />
          <span>Profile</span>
        </button>
      </nav>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-10/12 max-w-xs">
            {/* Modal Header */}
            <h2 className="text-lg font-bold mb-4">Profile</h2>
            
            {/* Modal Navigation Links */}
            <nav className="space-y-4">
              {["My Donations", "Pendings", "Received", "Settings", "Sign Out"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)} // Update active tab
                  className={`block text-left w-full px-4 py-2 rounded-lg ${
                    activeTab === tab
                      ? "bg-gray-200 text-gray-900 font-semibold"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
            
            {/* Close Button */}
            <button
              onClick={() => setIsProfileOpen(false)}
              className="mt-6 w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer Content (Visible on larger screens) */}
      <div className="hidden sm:block pt-4 mt-4">
        <div className="flex justify-center space-x-6">
          <a href="#" className="underline text-sm hover:text-gray-400">
            About Us
          </a>
          <a href="#" className="underline text-sm hover:text-gray-400">
            Contact
          </a>
          <a href="#" className="underline text-sm hover:text-gray-400">
            Privacy Policy
          </a>
        </div>
        <p className="text-sm mt-4">&copy; {new Date().getFullYear()} ShareKindness. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
