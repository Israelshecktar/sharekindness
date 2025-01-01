import { useState, useEffect } from "react";
import {
  HomeIcon,
  Squares2X2Icon,
  UserIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import DonationModal from "./DonationModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    <footer
      className="
        bg-gradient-to-r
        from-pink-500
        to-pink-600
        text-white
        p-4
        fixed
        bottom-0
        w-full
        sm:relative
        z-50
      "
    >
      {/* Bottom Nav (Mobile) */}
      <nav
        className="
          flex
          justify-around
          items-center
          sm:hidden
          text-sm
        "
      >
        {/* Home */}
        <a
          href="/dashboard"
          onClick={() => setActiveTab("home")}
          className={`
            flex flex-col items-center transition
            ${activeTab === "home" ? "text-yellow-300" : "hover:text-gray-200"}
          `}
        >
          <HomeIcon
            className={`
              w-6 h-6 mb-1
              ${activeTab === "home" ? "text-yellow-300" : ""}
              hover:scale-110 transform transition
            `}
          />
          <span>Home</span>
        </a>

        {/* Add Donation */}
        <button
          onClick={() => {
            setIsModalOpen(true);
            setActiveTab("add");
          }}
          className={`
            flex flex-col items-center transition
            ${activeTab === "add" ? "text-yellow-300" : "hover:text-gray-200"}
          `}
        >
          <div
            className={`
              flex items-center justify-center
              w-10 h-10 rounded-full
              transition-all
              ${
                activeTab === "add"
                  ? "bg-yellow-300"
                  : "bg-pink-700 hover:bg-pink-800"
              }
            `}
          >
            <PlusIcon className="w-5 h-5 text-white" />
          </div>
          <span>Add</span>
        </button>

        {/* Dashboard */}
        <a
          href="/donations"
          onClick={() => setActiveTab("dashboard")}
          className={`
            flex flex-col items-center relative transition
            ${
              activeTab === "dashboard"
                ? "text-yellow-300"
                : "hover:text-gray-200"
            }
          `}
        >
          <Squares2X2Icon
            className={`
              w-6 h-6 mb-1
              ${activeTab === "dashboard" ? "text-yellow-300" : ""}
              hover:scale-110 transform transition
            `}
          />
          <span>Dashboard</span>
          {notificationCount > 0 && (
            <span
              className="
                absolute
                top-[-5px] right-[-5px]
                bg-red-500
                text-white
                text-xs
                font-bold
                rounded-full
                w-5 h-5
                flex items-center justify-center
              "
            >
              {notificationCount}
            </span>
          )}
        </a>

        {/* Profile */}
        <button
          onClick={() => {
            setIsProfileOpen(true);
            setActiveTab("profile");
          }}
          className={`
            flex flex-col items-center transition
            ${
              activeTab === "profile"
                ? "text-yellow-300"
                : "hover:text-gray-200"
            }
          `}
        >
          <UserIcon
            className={`
              w-6 h-6 mb-1
              ${activeTab === "profile" ? "text-yellow-300" : ""}
              hover:scale-110 transform transition
            `}
          />
          <span>Account</span>
        </button>
      </nav>

      {/* ADD DONATION Modal */}
      {isModalOpen && <DonationModal onClose={() => setIsModalOpen(false)} />}

      {/* PROFILE Modal */}
      {isProfileOpen && (
        <div
          className="
            fixed inset-0
            bg-black bg-opacity-75
            flex items-center justify-center
            z-50
          "
        >
          <div className="bg-white rounded-lg p-6 w-10/12 max-w-xs relative">
            {/* Close Button */}
            <button
              onClick={() => setIsProfileOpen(false)}
              className="
                absolute
                top-4
                right-4
                text-gray-600
                hover:text-gray-900
                transition
              "
              aria-label="Close Modal"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold mb-4 text-gray-800">Account</h2>
            <nav className="space-y-4">
              <a
                href="/settings"
                className="
                  block
                  w-full
                  px-4 py-2
                  text-left
                  rounded-lg
                  text-gray-700
                  hover:text-gray-900
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
                  hover:text-red-600
                  transition
                "
              >
                Sign Out
              </button>
            </nav>
            <button
              onClick={() => setIsProfileOpen(false)}
              className="
                mt-6
                w-full
                py-2
                bg-pink-500
                text-white
                rounded-lg
                hover:bg-pink-600
                transition
              "
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer Content (Large screens) */}
      <div
        className="
          hidden
          sm:block
          pt-4 mt-4
          text-center
        "
        /* Removed 'border-t border-pink-400' here */
      >
        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="
              underline
              text-sm
              hover:text-gray-100
              transition
            "
          >
            About Us
          </a>
          <a
            href="#"
            className="
              underline
              text-sm
              hover:text-gray-100
              transition
            "
          >
            Contact
          </a>
          <a
            href="#"
            className="
              underline
              text-sm
              hover:text-gray-100
              transition
            "
          >
            Privacy Policy
          </a>
        </div>
        <p className="text-xs mt-4 text-yellow-100">
          &copy; {new Date().getFullYear()} ShareKindness. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
