"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header"; // Importing Header
import Footer from "../components/Footer"; // Importing Footer

const UserDashboard = () => {
  const [data, setData] = useState({ donations: [], requests: [] });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("donations");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/user-dashboard/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

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

  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-6">My Dashboard</h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`py-2 px-4 rounded-md transition-all ${
              activeTab === "donations" ? "bg-pink-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("donations")}
          >
            My Donations
          </button>
          <button
            className={`py-2 px-4 rounded-md transition-all ${
              activeTab === "requests" ? "bg-pink-500 text-white" : "bg-gray-200 text-black"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            My Requests
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : activeTab === "donations" ? (
          <DonationsList donations={data.donations} />
        ) : (
          <RequestsList requests={data.requests} />
        )}
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

// Component for My Donations
const DonationsList = ({ donations }) => (
  donations.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((donation) => (
        <div key={donation.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold mb-2">{donation.item_name}</h2>
          <p className="text-gray-600 mb-1"><strong>Status:</strong> {donation.status}</p>
          <p className="text-gray-600 mb-1"><strong>Quantity:</strong> {donation.quantity}</p>
          <p className="text-gray-600"><strong>Category:</strong> {donation.category}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">You have no donations yet.</p>
  )
);

// Component for My Requests
const RequestsList = ({ requests }) => (
  requests.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((request) => (
        <div key={request.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-lg font-semibold mb-2">{request.donation.item_name}</h2>
          <p className="text-gray-600 mb-1"><strong>Status:</strong> {request.status}</p>
          <p className="text-gray-600"><strong>Quantity Requested:</strong> {request.requested_quantity}</p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">You have no requests yet.</p>
  )
);

export default UserDashboard;
