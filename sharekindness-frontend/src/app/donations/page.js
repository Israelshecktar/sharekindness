"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserDashboard = () => {
  const [data, setData] = useState({ donations: [], requests: [] });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("donations");
  const [selectedDonation, setSelectedDonation] = useState(null);

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

  const handleApproveRequest = (donationId, requestId) => {
    console.log(`Approving request ${requestId} for donation ${donationId}`);
  };

  const handleRejectRequest = (donationId, requestId) => {
    console.log(`Rejecting request ${requestId} for donation ${donationId}`);
  };

  return (
    <>
      <Header />
      <div className="p-8 bg-blue-100 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
          My Dashboard
        </h1>
        <div className="flex justify-center space-x-6 mb-8">
          <button
            className={`py-3 px-6 font-medium rounded-lg transition-all shadow-md ${
              activeTab === "donations" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-900"
            }`}
            onClick={() => setActiveTab("donations")}
          >
            My Donations
          </button>
          <button
            className={`py-3 px-6 font-medium rounded-lg transition-all shadow-md ${
              activeTab === "requests" ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-900"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            My Requests
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : activeTab === "donations" ? (
          <DonationsList
            donations={data.donations}
            onReview={(donation) => setSelectedDonation(donation)}
          />
        ) : (
          <RequestsList requests={data.requests} />
        )}
      </div>
      <Footer />
      {selectedDonation && (
        <DonationRequestModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          onApprove={handleApproveRequest}
          onReject={handleRejectRequest}
        />
      )}
    </>
  );
};

const DonationsList = ({ donations, onReview }) => (
  donations.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((donation) => (
        <div
          key={donation.id}
          className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-2"
        >
          <h2 className="text-lg font-semibold mb-4 text-pink-500">{donation.item_name}</h2>
          <p className="text-gray-700 mb-2">
            <strong>Status:</strong> {donation.status}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Quantity:</strong> {donation.quantity}
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Category:</strong> {donation.category}
          </p>
          <button
            onClick={() => onReview(donation)}
            className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg hover:from-pink-600 hover:to-yellow-600 transition"
          >
            Review Requests
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">You have no donations yet.</p>
  )
);

const RequestsList = ({ requests }) => (
  requests.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {requests.map((request) => (
        <div
          key={request.id}
          className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-2"
        >
          <h2 className="text-lg font-semibold mb-4 text-pink-500">{request.donation.item_name}</h2>
          <p className="text-gray-700 mb-2">
            <strong>Status:</strong> {request.status}
          </p>
          <p className="text-gray-700">
            <strong>Quantity Requested:</strong> {request.requested_quantity}
          </p>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">You have no requests yet.</p>
  )
);

const DonationRequestModal = ({ donation, onClose, onApprove, onReject }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center text-pink-500">
        Requests for {donation.item_name}
      </h2>
      {donation.requests.length > 0 ? (
        <ul className="space-y-4">
          {donation.requests.map((request) => (
            <li
              key={request.id}
              className="p-4 bg-gray-100 rounded-lg shadow-md"
            >
              <p className="text-gray-700">
                <strong>User:</strong> {request.user.username}
              </p>
              <p className="text-gray-700">
                <strong>Quantity:</strong> {request.requested_quantity}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => onApprove(donation.id, request.id)}
                  className="py-1 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => onReject(donation.id, request.id)}
                  className="py-1 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">
          No requests for this donation yet.
        </p>
      )}
      <button
        onClick={onClose}
        className="mt-6 w-full py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
      >
        Close
      </button>
    </div>
  </div>
);

export default UserDashboard;
