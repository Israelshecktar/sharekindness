import { useState } from "react";
import { HomeIcon, Squares2X2Icon, UserIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // State for active tab

  // Logout Function
  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ refresh }),
      });

      if (response.ok) {
        toast.success("Logout successful!");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/auth";
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
          {/* Home */}
          <a
            href="/dashboard"
            onClick={() => setActiveTab("home")} // Set active tab
            className={`flex items-center text-lg sm:text-xl transition ${
              activeTab === "home" ? "text-yellow-300" : "hover:text-pink-300"
            }`}
          >
            <HomeIcon
              className={`w-6 h-6 mr-2 ${
                activeTab === "home" ? "text-yellow-300" : ""
              }`}
            />
            <span>Home</span>
          </a>

          {/* Dashboard */}
          <a
            href="/donations"
            onClick={() => setActiveTab("dashboard")} // Set active tab
            className={`flex items-center text-lg sm:text-xl transition ${
              activeTab === "dashboard" ? "text-yellow-300" : "hover:text-pink-300"
            }`}
          >
            <Squares2X2Icon
              className={`w-6 h-6 mr-2 ${
                activeTab === "dashboard" ? "text-yellow-300" : ""
              }`}
            />
            <span>Dashboard</span>
          </a>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setActiveTab("profile");
              }} // Set active tab
              className={`flex items-center text-lg sm:text-xl transition ${
                activeTab === "profile" ? "text-yellow-300" : "hover:text-pink-300"
              }`}
            >
              <UserIcon
                className={`w-6 h-6 mr-2 ${
                  activeTab === "profile" ? "text-yellow-300" : ""
                }`}
              />
              <span>Account</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md p-2 z-10">
                <a href="/settings" className="block px-4 py-2 hover:bg-gray-100">
                  Settings
                </a>
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
