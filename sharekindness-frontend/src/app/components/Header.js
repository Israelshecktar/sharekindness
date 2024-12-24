import { useState } from "react";
import { HomeIcon, GiftIcon, UserIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Logout Function
  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken"); // Get the refresh token from localStorage
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Access token from localStorage
        },
        body: JSON.stringify({ refresh }),
      });

      if (response.ok) {
        toast.success("Logout successful!");
        localStorage.removeItem("accessToken"); // Clear tokens
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth"; // Redirect to home or login page
      } else {
        const data = await response.json();
        toast.error(data.detail || "Logout failed!");
      }
    } catch (error) {
      toast.error("An error occurred during logout!");
    }
  };

  return (
    <header className="hidden sm:block relative z-40 bg-pink-500/90 text-white p-4 shadow-md backdrop-blur-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <img src="/sk1.svg" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">SHAREKINDNESS</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex space-x-8">
          <a href="#" className="flex items-center text-lg sm:text-xl hover:text-pink-300 transition">
            <HomeIcon className="w-6 h-6 mr-2" />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center text-lg sm:text-xl hover:text-pink-300 transition">
            <GiftIcon className="w-6 h-6 mr-2" />
            <span>Donations</span>
          </a>
          {/* Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center text-lg sm:text-xl hover:text-pink-300 transition"
            >
              <UserIcon className="w-6 h-6 mr-2" />
              <span>Profile</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md p-2 z-10">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">My Donations</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Pendings</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Received</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Settings</a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
