import { useState } from "react";
import { XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify"; // Toastify for notifications
import "react-toastify/dist/ReactToastify.css";
import api from "../utils/api"; // Centralized API handler

const SideModal = ({ donation, onClose, onApproveSelected }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async () => {
    if (!selectedRequest) {
      toast.error("Please select a request to approve.");
      return;
    }

    setIsApproving(true);

    try {
      // Use centralized API handler for the approval request
      await api.post("api/user-dashboard/", {
        action: "approve",
        request_id: selectedRequest.id,
      });

      toast.success(`Successfully approved request for ${selectedRequest.user.username}.`);
      
      // Update parent data or UI after successful approval
      onApproveSelected(selectedRequest.id);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred while approving the request."
      );
    } finally {
      setIsApproving(false);
    }
  };

  const closeExpandedImage = () => setExpandedImage(null);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end transition-opacity animate-fadeIn"
      >
        <div
          className="relative w-full max-w-lg h-full bg-white shadow-xl flex flex-col overflow-y-auto animate-slideInRight"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition-colors p-1.5"
            aria-label="Close Modal"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          <div className="px-6 pt-6">
            <h2 className="text-xl font-bold mb-4 text-pink-600 text-center">
              Requests for {donation?.donation?.item_name}
            </h2>
          </div>

          <div className="px-6 pb-6">
            {donation?.requests?.length > 0 ? (
              <ul className="space-y-4">
                {donation.requests.map((request) => (
                  <li
                    key={request.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-100 shadow-sm hover:shadow-md hover:bg-gray-200 transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={request.user.profile_picture || "/default-profile.jpg"}
                        alt={`${request.user.username}'s profile`}
                        className="w-12 h-12 rounded-full border cursor-pointer object-cover"
                        onClick={() =>
                          setExpandedImage(
                            request.user.profile_picture || "/default-profile.jpg"
                          )
                        }
                      />
                      <div>
                        <p className="text-gray-800 font-semibold">
                          {request.user.username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {request.user.city}, {request.user.state}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setSelectedRequest(
                          selectedRequest?.id === request.id ? null : request
                        )
                      }
                      className="text-gray-600 hover:text-pink-500 transition-colors"
                      aria-label="Select Request"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No requests for this donation yet.</p>
            )}
          </div>

          {selectedRequest && (
            <div className="px-6 pb-6">
              <div className="p-4 rounded-lg shadow-md bg-white border">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {selectedRequest.user.username}'s Request
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={selectedRequest.user.profile_picture || "/default-profile.jpg"}
                    alt={`${selectedRequest.user.username}'s profile`}
                    className="w-16 h-16 rounded-full border cursor-pointer object-cover"
                    onClick={() =>
                      setExpandedImage(
                        selectedRequest.user.profile_picture || "/default-profile.jpg"
                      )
                    }
                  />
                  <div>
                    <p className="text-gray-600">
                      <strong>Quantity Requested:</strong>{" "}
                      {selectedRequest.requested_quantity}
                    </p>
                    <p className="text-gray-600">
                      <strong>Location:</strong>{" "}
                      {selectedRequest.user.city}, {selectedRequest.user.state}
                    </p>
                    <p className="text-gray-600">
                      <strong>Contact:</strong>{" "}
                      {selectedRequest.user.phone_number || "Not provided"}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600">
                  <strong>Comment:</strong>{" "}
                  {selectedRequest.comments || "No comment provided."}
                </p>
                <button
                  onClick={handleApprove}
                  className="mt-4 w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  disabled={isApproving}
                >
                  {isApproving
                    ? `Approving ${selectedRequest.user.username}...`
                    : `Approve ${selectedRequest.user.username}`}
                </button>
              </div>
            </div>
          )}

          <div className="px-6 pb-6">
            <button
              onClick={onClose}
              className="mt-4 w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {expandedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fadeIn"
          onClick={closeExpandedImage}
        >
          <img
            src={expandedImage}
            alt="Expanded Profile"
            className="max-w-full max-h-full rounded-lg object-cover"
          />
          <button
            onClick={closeExpandedImage}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default SideModal;
