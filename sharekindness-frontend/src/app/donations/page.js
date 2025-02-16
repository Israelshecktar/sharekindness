"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideModal from "./sideModal";
import api from "../utils/api";
import {
  PhotoIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

//
// STATUS STYLES
//
const STATUS_STYLES = {
  APPROVED: {
    text: "Approved",
    color: "text-green-600",
    icon: (
      <CheckCircleIcon className="w-5 h-5 text-green-600 inline-block mr-1" />
    ),
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
  CLAIMED: {
    text: "Claimed",
    color: "text-blue-600",
    icon: (
      <CheckCircleIcon className="w-5 h-5 text-blue-600 inline-block mr-1" />
    ),
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

  // ---------------------------
  // Fetch Dashboard Data
  // ---------------------------
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Example endpoint: GET /api/user-dashboard/
        // returns { donations: [...], requests: [...] }
        const response = await api.get("api/user-dashboard/");
        setData(response);
      } catch (error) {
        toast.error(
          error.response?.data?.detail || "Failed to fetch dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ---------------------------
  // Approve a request (Donor action)
  // ---------------------------
  const handleApproveSelected = async (selectedRequestId) => {
    try {
      await api.post("api/user-dashboard/", {
        action: "approve",
        request_id: selectedRequestId,
      });

      toast.success("Request approved successfully!");

      // Update local state so we see the new request status
      setData((prevData) => ({
        ...prevData,
        donations: prevData.donations.map((d) => {
          if (
            selectedDonation &&
            d.donation.id === selectedDonation.donation.id
          ) {
            return {
              ...d,
              requests: d.requests.map((r) =>
                r.id === selectedRequestId ? { ...r, status: "APPROVED" } : r
              ),
            };
          }
          return d;
        }),
      }));

      // Also update the selectedDonation (SideModal) if open
      if (selectedDonation) {
        setSelectedDonation((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            requests: prev.requests.map((r) =>
              r.id === selectedRequestId ? { ...r, status: "APPROVED" } : r
            ),
          };
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to approve the request."
      );
    }
  };

  // ---------------------------
  // Mark a request as claimed (Recipient action)
  // ---------------------------
  const handleMarkAsClaimed = async (requestId) => {
    try {
      await api.patch(`api/requests/${requestId}/mark-as-claimed/`);
      toast.success("Item successfully claimed!");

      // Update local state in both donations + requests
      setData((prevData) => ({
        ...prevData,
        donations: prevData.donations.map((d) => ({
          ...d,
          requests: d.requests.map((r) =>
            r.id === requestId ? { ...r, status: "CLAIMED" } : r
          ),
        })),
        requests: prevData.requests.map((r) =>
          r.id === requestId ? { ...r, status: "CLAIMED" } : r
        ),
      }));

      // If the side modal is open, update request statuses there too
      setSelectedDonation((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          requests: prev.requests.map((r) =>
            r.id === requestId ? { ...r, status: "CLAIMED" } : r
          ),
        };
      });
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Failed to mark the request as claimed."
      );
    }
  };

  // ---------------------------
  // Helpers
  // ---------------------------
  const getImageUrl = (image) =>
    image.startsWith("http")
      ? image
      : `${process.env.NEXT_PUBLIC_API_URL}/${image.replace(/^\//, "")}`;

  const formatStatus = (status) =>
    STATUS_STYLES[status] || STATUS_STYLES.DEFAULT;

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <>
      <Header />

      <div className="min-h-screen bg-blue-100 py-8 px-2 sm:px-4 lg:px=2">
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

          {/* Donations & Requests */}
          {!loading && (
            <div className="pb-24">
              {/* =====================
                  DONATIONS TAB
              ===================== */}
              {activeTab === "donations" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.donations.length > 0 ? (
                    data.donations.map((donationObj) => {
                      const { donation, requests } = donationObj;
                      // donation might contain claimed_by, e.g. [ "Ayoade" ]

                      return (
                        <div
                          key={donation.id}
                          className="p-4 bg-white shadow-md hover:shadow-xl rounded-lg border border-gray-200 transition-transform transform hover:-translate-y-1 flex flex-col animate-scaleIn"
                        >
                          {/* Donation Image */}
                          {donation.image ? (
                            <img
                              src={getImageUrl(donation.image)}
                              alt={`Image of ${donation.item_name}`}
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

                          {/* Donation info */}
                          <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-2">
                            {donation.item_name}
                          </h4>
                          <p className="text-gray-700 text-sm mb-2">
                            <strong>Requests:</strong> {requests.length}
                          </p>
                          <p className="text-gray-700 text-sm">
                            <strong>Status:</strong> {donation.status}
                          </p>

                          {/* If item is claimed and we have who claimed it, display them */}
                          {donation.status === "CLAIMED" &&
                            donation.claimed_by &&
                            donation.claimed_by.length > 0 && (
                              <p className="mt-1 text-sm text-blue-600 font-semibold">
                                Claimed by: {donation.claimed_by.join(", ")}
                              </p>
                            )}

                          {/* Donation Action Button */}
                          <div className="mt-auto">
                            {donation.status === "CLAIMED" ? (
                              <button
                                disabled
                                className="mt-3 py-2 w-full font-semibold text-white bg-gray-400 rounded-md cursor-not-allowed"
                              >
                                Item Fully Claimed
                              </button>
                            ) : donation.status === "REQUEST CLOSED" ? (
                              <button
                                disabled
                                className="mt-3 py-2 w-full font-semibold text-white bg-gray-400 rounded-md cursor-not-allowed"
                              >
                                Request Closed
                              </button>
                            ) : (
                              <button
                                onClick={() => setSelectedDonation(donationObj)}
                                className="mt-3 py-2 w-full font-semibold text-white rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 transition focus:outline-none"
                              >
                                Review Requests
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-gray-500">
                      No donations yet.
                    </p>
                  )}
                </div>
              )}

              {/* =====================
                  REQUESTS TAB
              ===================== */}
              {activeTab === "requests" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.requests.length > 0 ? (
                    data.requests.map((req) => {
                      const { text, color, icon } = formatStatus(req.status);
                      const { donation } = req;

                      return (
                        <div
                          key={req.id}
                          className="p-4 bg-white shadow-md hover:shadow-xl rounded-lg border border-gray-200 transition-transform transform hover:-translate-y-1 animate-scaleIn"
                        >
                          {/* Request's Donation Image */}
                          {donation?.image ? (
                            <img
                              src={getImageUrl(donation.image)}
                              alt={`Image of ${donation.item_name}`}
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

                          {/* Request info */}
                          <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-2">
                            {donation?.item_name}
                          </h4>
                          <p className={`text-sm font-semibold ${color}`}>
                            {icon}
                            {text}
                          </p>

                          {/* "Mark as Claimed" if status is APPROVED */}
                          {req.status === "APPROVED" && (
                            <button
                              onClick={() => handleMarkAsClaimed(req.id)}
                              className="mt-4 py-2 w-full font-semibold text-white rounded-md bg-green-500 hover:bg-green-600 transition focus:outline-none"
                            >
                              Mark as Claimed
                            </button>
                          )}

                          {/* If request is CLAIMED, show label */}
                          {/* If request is CLAIMED, show "Donated by" */}
                          {req.status === "CLAIMED" && (
                            <p className="mt-4 text-blue-600 font-semibold">
                              Donated by {donation?.donor_name}
                            </p>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center text-gray-500">
                      No requests yet.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
      {/* The SideModal for reviewing requests for a particular donation */}
      {selectedDonation && (
        <SideModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          onApproveSelected={handleApproveSelected}
          onMarkAsClaimed={handleMarkAsClaimed}
        />
      )}
    </>
  );
};

export default UserDashboard;
