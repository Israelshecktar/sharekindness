import { useState, useEffect } from "react";
import { HomeIcon, Squares2X2Icon, UserIcon, PlusIcon } from "@heroicons/react/24/outline";
import DonationModal from "./DonationModal"; // Import the modal component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal
  const [activeTab, setActiveTab] = useState("home"); // State for active tab
  const [notificationCount, setNotificationCount] = useState(0); // Notification count state

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user-notifications/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

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
    <footer className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-4 fixed bottom-0 w-full sm:relative">
      {/* Navigation Links (Visible on smaller screens) */}
      <nav className="flex justify-around items-center sm:hidden">
        {/* Home Tab */}
        <a
          href="/dashboard"
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center text-sm transition ${
            activeTab === "home" ? "text-yellow-300" : "hover:text-gray-200"
          }`}
        >
          <HomeIcon className={`w-6 h-6 mb-1 ${activeTab === "home" ? "text-yellow-300" : ""}`} />
          <span className="text-center">Home</span>
        </a>

        {/* Add Donation Tab */}
        <button
          onClick={() => {
            setIsModalOpen(true);
            setActiveTab("add");
          }}
          className={`flex flex-col items-center text-sm transition ${
            activeTab === "add" ? "text-yellow-300" : "hover:text-gray-200"
          }`}
        >
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              activeTab === "add" ? "bg-yellow-300" : "bg-pink-700"
            }`}
          >
            <PlusIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-center">Add</span>
        </button>

        {/* Dashboard Tab */}
        <a
          href="/donations"
          onClick={() => setActiveTab("dashboard")}
          className={`flex flex-col items-center relative text-sm transition ${
            activeTab === "dashboard" ? "text-yellow-300" : "hover:text-gray-200"
          }`}
        >
          <Squares2X2Icon className={`w-6 h-6 mb-1 ${activeTab === "dashboard" ? "text-yellow-300" : ""}`} />
          <span className="text-center">Dashboard</span>
          {notificationCount > 0 && (
            <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </a>

        {/* Profile Tab */}
        <button
          onClick={() => {
            setIsProfileOpen(true);
            setActiveTab("profile");
          }}
          className={`flex flex-col items-center text-sm transition ${
            activeTab === "profile" ? "text-yellow-300" : "hover:text-gray-200"
          }`}
        >
          <UserIcon className={`w-6 h-6 mb-1 ${activeTab === "profile" ? "text-yellow-300" : ""}`} />
          <span className="text-center">Account</span>
        </button>
      </nav>

      {/* Modal for Add Donation */}
      {isModalOpen && <DonationModal onClose={() => setIsModalOpen(false)} />}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-10/12 max-w-xs">
            <h2 className="text-lg font-bold mb-4">Account</h2>
            <nav className="space-y-4">
              <a
                href="/settings"
                className="block text-left w-full px-4 py-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              >
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </nav>
            <button
              onClick={() => setIsProfileOpen(false)}
              className="mt-6 w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer Content (Visible on larger screens, centered) */}
      <div className="hidden sm:block text-center pt-4 mt-4">
        <div className="flex justify-center space-x-6">
          <a href="#" className="underline text-sm hover:text-gray-200">
            About Us
          </a>
          <a href="#" className="underline text-sm hover:text-gray-200">
            Contact
          </a>
          <a href="#" className="underline text-sm hover:text-gray-200">
            Privacy Policy
          </a>
        </div>
        <p className="text-sm mt-4 text-yellow-200">
          &copy; {new Date().getFullYear()} ShareKindness. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
