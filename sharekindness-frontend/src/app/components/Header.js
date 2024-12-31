import { useState, useEffect } from "react";
import {
  HomeIcon,
  Squares2X2Icon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [notificationCount, setNotificationCount] = useState(0);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/user-notifications/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications.");
        }

        const data = await response.json();
        setNotificationCount(data.pending_requests + data.pending_donations);
      } catch (error) {
        console.error(error.message);
        toast.error("Unable to fetch notifications.");
      }
    };

    fetchNotifications();
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ refresh }),
        }
      );

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
    <header
      className="
        hidden sm:block
        relative
        z-40
        bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700
        text-white
        p-4
        shadow-md
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Branding */}
        <div className="flex items-center space-x-3">
          {/* Optional: subtle hover scale on the logo */}
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
                text-2xl
                sm:text-3xl
                font-extrabold
                tracking-wide
                transition
              "
            >
              ShareKindness
            </h1>
            {/* Tagline (small, italic text) */}
            <span
              className="
                italic
                text-sm
                sm:text-base
                text-pink-100
                mt-0.5
                transition
              "
            >
              Empowering Good Deeds, One Act at a Time
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-8">
          {/* Home */}
          <a
            href="/dashboard"
            onClick={() => setActiveTab("home")}
            className={`
              flex items-center
              text-lg sm:text-xl
              transition
              ${
                activeTab === "home"
                  ? "text-yellow-300"
                  : "hover:text-yellow-200"
              }
            `}
          >
            <HomeIcon
              className={`
                w-6 h-6 mr-2
                ${activeTab === "home" ? "text-yellow-300" : ""}
              `}
            />
            <span>Home</span>
          </a>

          {/* Dashboard */}
          <a
            href="/donations"
            onClick={() => setActiveTab("dashboard")}
            className={`
              relative
              flex
              items-center
              text-lg sm:text-xl
              transition
              ${
                activeTab === "dashboard"
                  ? "text-yellow-300"
                  : "hover:text-yellow-200"
              }
            `}
          >
            <Squares2X2Icon
              className={`
                w-6 h-6 mr-2
                ${activeTab === "dashboard" ? "text-yellow-300" : ""}
              `}
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

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen((prev) => !prev);
                setActiveTab("profile");
              }}
              className={`
                flex
                items-center
                text-lg sm:text-xl
                transition
                ${
                  activeTab === "profile"
                    ? "text-yellow-300"
                    : "hover:text-yellow-200"
                }
              `}
            >
              <UserIcon
                className={`
                  w-6 h-6 mr-2
                  ${activeTab === "profile" ? "text-yellow-300" : ""}
                `}
              />
              <span>Account</span>
            </button>
            {isProfileOpen && (
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
                <a
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </a>
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
    </header>
  );
};

export default Header;
