import { useState, useEffect } from "react";
import {
  HomeIcon,
  Squares2X2Icon,
  UserIcon,
  XMarkIcon,
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
    <>
      {/* Background Wrapper: Full-width gradient + glass effect */}
      <div className="relative z-40">
        {/* Subtle gradient behind glass effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700" />

        <header
          className="
            hidden sm:block
            relative
            p-4
            text-white
            shadow-md
            bg-white/10  /* glass-like effect */
            backdrop-blur-md
          "
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3">
              <img
                src="/sk1.svg"
                alt="Logo"
                className="w-9 h-9 sm:w-10 sm:h-10"
              />
              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-wide
                  bg-clip-text text-transparent
                  bg-gradient-to-r from-white to-yellow-300
                "
              >
                SHAREKINDNESS
              </h1>
            </div>

            {/* Navigation */}
            <nav className="flex space-x-8">
              {/* Home */}
              <a
                href="/dashboard"
                onClick={() => setActiveTab("home")}
                className={`
                  flex items-center
                  text-lg
                  transition
                  ${
                    activeTab === "home"
                      ? "text-yellow-300"
                      : "hover:text-pink-100"
                  }
                `}
              >
                <HomeIcon
                  className={`
                    w-6 h-6 mr-1
                    transform
                    hover:scale-105
                    transition-transform
                    ${
                      activeTab === "home" ? "text-yellow-300" : ""
                    }
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
                  flex items-center
                  text-lg
                  transition
                  ${
                    activeTab === "dashboard"
                      ? "text-yellow-300"
                      : "hover:text-pink-100"
                  }
                `}
              >
                <Squares2X2Icon
                  className={`
                    w-6 h-6 mr-1
                    transform
                    hover:scale-105
                    transition-transform
                    ${
                      activeTab === "dashboard" ? "text-yellow-300" : ""
                    }
                  `}
                />
                <span>Dashboard</span>
                {notificationCount > 0 && (
                  <span
                    className="
                      absolute
                      -top-2 -right-3
                      bg-red-500
                      text-white
                      text-xs
                      font-bold
                      rounded-full
                      w-5 h-5
                      flex
                      items-center
                      justify-center
                      border-2 border-pink-600
                    "
                  >
                    {notificationCount}
                  </span>
                )}
              </a>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProfileOpen((prev) => !prev);
                    setActiveTab("profile");
                  }}
                  className={`
                    flex items-center
                    text-lg
                    transition
                    ${
                      activeTab === "profile"
                        ? "text-yellow-300"
                        : "hover:text-pink-100"
                    }
                  `}
                >
                  <UserIcon
                    className={`
                      w-6 h-6 mr-1
                      transform
                      hover:scale-105
                      transition-transform
                      ${
                        activeTab === "profile" ? "text-yellow-300" : ""
                      }
                    `}
                  />
                  <span>Account</span>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      mt-2
                      w-48
                      bg-white
                      text-gray-700
                      shadow-xl
                      rounded-md
                      py-2
                      z-10
                      animate-fadeIn
                    "
                  >
                    <a
                      href="/settings"
                      className="
                        block
                        px-4 py-2
                        hover:bg-gray-100
                        transition
                      "
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
                        transition
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
      </div>
    </>
  );
};

export default Header;
