"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideModal from "./sideModal";

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

  const handleApproveSelected = async (selectedRequests) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}api/requests/approve-bulk/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ request_ids: selectedRequests }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to approve selected requests.");
      }

      toast.success("Selected requests approved!");
      setData((prev) => ({
        ...prev,
        donations: prev.donations.map((donation) =>
          donation.donation.id === selectedDonation.donation.id
            ? {
                ...donation,
                requests: donation.requests.map((request) =>
                  selectedRequests.includes(request.id)
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

  const formatText = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

  return (
    <>
      <Header />
      
      {/* Outer wrapper: Very little horizontal padding on large screens */}
      <div
        className="
          min-h-screen 
          bg-blue-100
          py-8 
          px-2          /* minimal padding on mobile */
          sm:px-4       /* slightly more on small */
          lg:px-2       /* reduce side padding again on large screens */
        "
      >
        {/* 
          Inner wrapper: 
          - max-w-4xl keeps container from stretching too wide 
          - mx-auto centers it
        */}
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="mb-10 text-center">
            <h1
              className="
                text-4xl 
                font-extrabold 
                bg-clip-text 
                text-transparent 
                bg-gradient-to-r 
                from-pink-600 
                to-yellow-500 
                mb-2
                animate-fadeIn
              "
            >
              My Dashboard
            </h1>
            <p className="text-gray-600">
              Here you can manage your donations and requests seamlessly.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center space-x-4 mb-8 animate-fadeIn">
            <button
              className={`
                px-5 py-2 
                font-semibold 
                rounded-full 
                transition-all 
                shadow-sm 
                focus:outline-none
                ${
                  activeTab === "donations"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
              onClick={() => setActiveTab("donations")}
            >
              My Donations
            </button>
            <button
              className={`
                px-5 py-2 
                font-semibold 
                rounded-full 
                transition-all 
                shadow-sm 
                focus:outline-none
                ${
                  activeTab === "requests"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
              onClick={() => setActiveTab("requests")}
            >
              My Requests
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <p className="text-center text-gray-500 animate-pulse">Loading...</p>
          )}

          {/* Donations Grid */}
          {!loading && activeTab === "donations" && (
            <div
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                gap-6
              "
            >
              {data.donations.length > 0 ? (
                data.donations.map((donation) => (
                  <div
                    key={donation.donation.id}
                    className="
                      p-4 
                      bg-white 
                      shadow-md 
                      hover:shadow-xl
                      rounded-lg 
                      border border-gray-200 
                      transition-transform transform 
                      hover:-translate-y-1 
                      flex flex-col 
                      animate-scaleIn
                    "
                  >
                    {/* Donation Image */}
                    {donation.donation.image ? (
                      <img
                        src={getImageUrl(donation.donation.image)}
                        alt={`Image of ${donation.donation.item_name}`}
                        className="
                          w-full
                          h-40
                          object-cover
                          rounded-md
                          mb-4
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex flex-col 
                          items-center 
                          justify-center 
                          w-full 
                          h-40 
                          bg-gradient-to-r 
                          from-gray-300 
                          to-gray-400 
                          rounded-md 
                          mb-4
                        "
                      >
                        <PhotoIcon className="w-10 h-10 text-gray-600 mb-2" />
                        <span className="text-gray-600 text-xs">
                          No Image Available
                        </span>
                      </div>
                    )}
                    {/* Donation Info */}
                    <h4
                      className="
                        text-lg 
                        font-bold 
                        text-transparent 
                        bg-clip-text 
                        bg-gradient-to-r 
                        from-pink-500 
                        to-yellow-500 
                        mb-2
                      "
                    >
                      {formatText(donation.donation.item_name)}
                    </h4>
                    <p className="text-gray-700 text-sm mb-1">
                      <strong>Status:</strong> {formatText(donation.donation.status)}
                    </p>
                    <p className="text-gray-700 text-sm mb-4">
                      <strong>Requests:</strong> {donation.requests.length}
                    </p>
                    {/* Button */}
                    <button
                      onClick={() => setSelectedDonation(donation)}
                      className="
                        mt-auto 
                        py-2 
                        w-full 
                        font-semibold 
                        text-white 
                        rounded-md 
                        bg-gradient-to-r 
                        from-pink-500 
                        to-yellow-500 
                        hover:from-pink-600 
                        hover:to-yellow-600 
                        transition
                        focus:outline-none
                      "
                    >
                      Review Requests
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 w-full col-span-3">
                  You don’t have any donations yet.
                </p>
              )}
            </div>
          )}

          {/* Requests Grid */}
          {!loading && activeTab === "requests" && (
            <div
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                gap-6
              "
            >
              {data.requests.length > 0 ? (
                data.requests.map((request) => (
                  <div
                    key={request.id}
                    className="
                      p-4 
                      bg-white 
                      shadow-md 
                      hover:shadow-xl
                      rounded-lg 
                      border border-gray-200 
                      transition-transform transform 
                      hover:-translate-y-1 
                      animate-scaleIn
                    "
                  >
                    {/* Request Image */}
                    {request.donation.image ? (
                      <img
                        src={getImageUrl(request.donation.image)}
                        alt={`Image of ${request.donation.item_name}`}
                        className="
                          w-full
                          h-40
                          object-cover
                          rounded-md
                          mb-4
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex flex-col 
                          items-center 
                          justify-center 
                          w-full 
                          h-40 
                          bg-gradient-to-r 
                          from-gray-300 
                          to-gray-400 
                          rounded-md 
                          mb-4
                        "
                      >
                        <PhotoIcon className="w-10 h-10 text-gray-600 mb-2" />
                        <span className="text-gray-600 text-xs">
                          No Image Available
                        </span>
                      </div>
                    )}
                    {/* Request Info */}
                    <h4
                      className="
                        text-lg 
                        font-bold 
                        text-transparent 
                        bg-clip-text 
                        bg-gradient-to-r 
                        from-pink-500 
                        to-yellow-500 
                        mb-2
                      "
                    >
                      {formatText(request.donation.item_name)}
                    </h4>
                    <p className="text-gray-700 text-sm mb-1">
                      <strong>Status:</strong> {request.status}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 w-full col-span-3">
                  You don’t have any requests yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Side Modal for Reviewing Requests */}
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
