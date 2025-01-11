import { useState, useEffect } from "react";
import {
  HomeIcon,
  Squares2X2Icon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api"; // Import centralized API handler
import ProfileModal from "./ProfileModal";  // <-- Import our ProfileModal

const Header = () => {
  // Separate states for the dropdown and the modal
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("api/user-notifications/");
        const { pending_requests = 0, pending_donations = 0 } = response || {};
        setNotificationCount(pending_requests + pending_donations);
      } catch (error) {
        toast.error(
          error.response?.data?.detail || "Unable to fetch notifications."
        );
      }
    };

    fetchNotifications();
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken");
      await api.post("api/logout/", { refresh });

      toast.success("Logout successful!");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/auth"; // Redirect to the auth page
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "An error occurred during logout."
      );
    }
  };

  // Toggle the account dropdown
  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen((prev) => !prev);
    setActiveTab("profile");
  };

  // Show the Profile Modal & hide dropdown
  const openProfileModal = () => {
    setIsProfileModalOpen(true);
    setIsAccountDropdownOpen(false);
  };

  // Hide the Profile Modal
  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <header
      className="
        hidden sm:block
        relative
        z-40
        bg-blue-100
        text-gray-800
        p-4
        border-b
        border-gray-200
        shadow-sm
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Branding */}
        <div className="flex items-center space-x-3">
          <img
            src="/ShareKindness-Logo.png"
            alt="ShareKindness Logo"
            className="
              w-10 h-10 sm:w-12 sm:h-12
              transition-transform
              duration-200
              hover:scale-105
            "
          />
          <div className="flex flex-col leading-tight">
            <h1
              className="
                text-xl sm:text-2xl
                font-bold
                tracking-wide
                transition
              "
            >
              ShareKindness
            </h1>
            <span
              className="
                text-sm sm:text-base
                text-gray-500
                mt-0.5
              "
            >
              Empowering Good Deeds, One Act at a Time
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-8 text-sm sm:text-base font-medium">
          {/* Home */}
          <a
            href="/dashboard"
            onClick={() => setActiveTab("home")}
            className={`flex items-center transition-colors ${
              activeTab === "home"
                ? "text-indigo-600"
                : "text-gray-600 hover:text-indigo-500"
            }`}
          >
            <HomeIcon
              className={`w-5 h-5 mr-2 ${
                activeTab === "home" ? "text-indigo-600" : ""
              }`}
            />
            <span>Home</span>
          </a>

          {/* Dashboard */}
          <a
            href="/donations"
            onClick={() => setActiveTab("dashboard")}
            className={`relative flex items-center transition-colors ${
              activeTab === "dashboard"
                ? "text-indigo-600"
                : "text-gray-600 hover:text-indigo-500"
            }`}
          >
            <Squares2X2Icon
              className={`w-5 h-5 mr-2 ${
                activeTab === "dashboard" ? "text-indigo-600" : ""
              }`}
            />
            <span>Dashboard</span>
            {notificationCount > 0 && (
              <span
                className="
                  absolute
                  -top-2
                  -right-3
                  bg-red-500
                  text-white
                  text-xs
                  font-bold
                  rounded-full
                  w-5
                  h-5
                  flex
                  items-center
                  justify-center
                "
              >
                {notificationCount}
              </span>
            )}
          </a>

          {/* Account */}
          <div className="relative">
            <button
              onClick={toggleAccountDropdown}
              className={`flex items-center transition-colors ${
                activeTab === "profile"
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              <UserIcon
                className={`w-5 h-5 mr-2 ${
                  activeTab === "profile" ? "text-indigo-600" : ""
                }`}
              />
              <span>Account</span>
            </button>

            {/* Dropdown with Profile & Sign Out */}
            {isAccountDropdownOpen && (
              <div
                className="
                  absolute
                  right-0
                  mt-2
                  w-48
                  bg-white
                  text-gray-700
                  shadow-lg
                  rounded-md
                  p-2
                "
              >
                <button
                  onClick={openProfileModal}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="
                    block
                    w-full
                    text-left
                    px-4 py-2
                    text-red-500
                    hover:bg-gray-100
                  "
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* ProfileModal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
      />
    </header>
  );
};

export default Header;