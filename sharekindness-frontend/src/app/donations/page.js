"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideModal from "./sideModal";
// For cases with no image
import { PhotoIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const STATUS_STYLES = {
  APPROVED: {
    text: "Approved",
    color: "text-green-600",
    icon: <CheckCircleIcon className="w-5 h-5 text-green-600 inline-block mr-1" />,
  },
  REJECTED: {
    text: "Rejected",
    color: "text-red-600",
    icon: <XCircleIcon className="w-5 h-5 text-red-600 inline-block mr-1" />,
  },
  PENDING: {
    text: "Pending",
    color: "text-yellow-600",
    icon: null,
  },
  DEFAULT: {
    text: "Unknown",
    color: "text-gray-500",
    icon: null,
  },
};

const UserDashboard = () => {
  const [data, setData] = useState({ donations: [], requests: [] });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("donations");
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}api/user-dashboard/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleApproveSelected = async (selectedRequestId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/user-dashboard/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "approve",
            request_id: selectedRequestId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to approve the request.");
      }

      toast.success("Request approved successfully!");

      setData((prev) => ({
        ...prev,
        donations: prev.donations.map((donation) =>
          donation.donation.id === selectedDonation.donation.id
            ? {
                ...donation,
                requests: donation.requests.map((request) =>
                  request.id === selectedRequestId
                    ? { ...request, status: "APPROVED" }
                    : request
                ),
              }
            : donation
        ),
      }));

      setSelectedDonation(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getImageUrl = (image) =>
    image.startsWith("http")
      ? image
      : `${process.env.NEXT_PUBLIC_API_URL}/${image.replace(/^\//, "")}`;

  const formatStatus = (status) => STATUS_STYLES[status] || STATUS_STYLES.DEFAULT;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-blue-100 py-8 px-2 sm:px-4 lg:px-2">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-yellow-500 mb-2 animate-fadeIn">
              My Dashboard
            </h1>
            <p className="text-gray-600">
              Here you can manage your donations and requests seamlessly.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-8 animate-fadeIn">
            <button
              className={`px-5 py-2 font-semibold rounded-full transition-all shadow-sm focus:outline-none ${
                activeTab === "donations"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("donations")}
            >
              My Donations
            </button>
            <button
              className={`px-5 py-2 font-semibold rounded-full transition-all shadow-sm focus:outline-none ${
                activeTab === "requests"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab("requests")}
            >
              My Requests
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center mb-8">
              <div className="flex flex-col items-center space-y-2">
                <svg
                  className="animate-spin h-8 w-8 text-pink-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <p className="text-gray-600">Loading your dashboard...</p>
              </div>
            </div>
          )}

          {/* Donations and Requests */}
          {!loading && (
            <div>
              {activeTab === "donations" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.donations.length > 0 ? (
                    data.donations.map((donation) => (
                      <div
                        key={donation.donation.id}
                        className="p-4 bg-white shadow-md hover:shadow-xl rounded-lg border border-gray-200 transition-transform transform hover:-translate-y-1 flex flex-col animate-scaleIn"
                      >
                        {/* Donation Image */}
                        {donation.donation.image ? (
                          <img
                            src={getImageUrl(donation.donation.image)}
                            alt={`Image of ${donation.donation.item_name}`}
                            className="w-full h-40 object-cover rounded-md mb-4"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center w-full h-40 bg-gradient-to-r from-gray-300 to-gray-400 rounded-md mb-4">
                            <PhotoIcon className="w-10 h-10 text-gray-600 mb-2" />
                            <span className="text-gray-600 text-xs">
                              No Image Available
                            </span>
                          </div>
                        )}

                        {/* Donation Info */}
                        <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-2">
                          {donation.donation.item_name}
                        </h4>
                        <p className="text-gray-700 text-sm mb-4">
                          <strong>Requests:</strong> {donation.requests.length}
                        </p>

                        {/* Review Requests Button */}
                        <button
                          onClick={() => setSelectedDonation(donation)}
                          className="mt-auto py-2 w-full font-semibold text-white rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 transition focus:outline-none"
                        >
                          Review Requests
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">No donations yet.</p>
                  )}
                </div>
              )}

              {activeTab === "requests" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.requests.length > 0 ? (
                    data.requests.map((request) => {
                      const { text, color, icon } = formatStatus(request.status);

                      return (
                        <div
                          key={request.id}
                          className="p-4 bg-white shadow-md hover:shadow-xl rounded-lg border border-gray-200 transition-transform transform hover:-translate-y-1 animate-scaleIn"
                        >
                          {/* Request Image */}
                          {request.donation.image ? (
                            <img
                              src={getImageUrl(request.donation.image)}
                              alt={`Image of ${request.donation.item_name}`}
                              className="w-full h-40 object-cover rounded-md mb-4"
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center w-full h-40 bg-gradient-to-r from-gray-300 to-gray-400 rounded-md mb-4">
                              <PhotoIcon className="w-10 h-10 text-gray-600 mb-2" />
                              <span className="text-gray-600 text-xs">
                                No Image Available
                              </span>
                            </div>
                          )}

                          {/* Request Info */}
                          <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-2">
                            {request.donation.item_name}
                          </h4>
                          <p className={`text-sm font-semibold ${color}`}>
                            {icon}
                            {text}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-gray-500">No requests yet.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {selectedDonation && (
        <SideModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          onApproveSelected={handleApproveSelected}
        />
      )}
    </>
  );
};

export default UserDashboard;
