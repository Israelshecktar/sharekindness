import { useState } from "react";
import { Tooltip } from "react-tooltip"; 
import { XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
// ^ Example usage of Heroicons. Install via `npm i @heroicons/react` or `yarn add @heroicons/react`.

const SideModal = ({ donation, onClose, onApproveSelected }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

  const handleApprove = () => {
    if (!selectedRequest) return;
    onApproveSelected([selectedRequest.id]);
  };

  const closeExpandedImage = () => setExpandedImage(null);

  return (
    <>
      {/* Modal Overlay & Container */}
      <div
        className="
          fixed inset-0 
          bg-black bg-opacity-50 
          z-50 
          flex justify-end
          transition-opacity
          animate-fadeIn
        "
      >
        {/* Slide-in Panel */}
        <div
          className="
            relative 
            w-full max-w-lg 
            h-full 
            bg-white 
            shadow-xl 
            flex flex-col 
            overflow-y-auto 
            animate-slideInRight
          "
        >
          {/* Close Button (Top-Right) */}
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4 
              text-gray-700 
              hover:text-red-500 
              transition-colors 
              p-1.5
            "
            aria-label="Close Modal"
            data-tooltip-id="tooltip-close"
            data-tooltip-content="Close the requests panel"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Modal Header */}
          <div className="px-6 pt-6">
            <h2 className="text-xl font-bold mb-4 text-pink-600 text-center">
              Requests for {donation?.donation?.item_name}
            </h2>
          </div>

          {/* Requests List */}
          <div className="px-6 pb-6">
            {donation?.requests?.length > 0 ? (
              <ul className="space-y-4">
                {donation.requests.map((request) => (
                  <li
                    key={request.id}
                    className="
                      flex items-center justify-between 
                      p-4 rounded-lg 
                      bg-gray-100 
                      shadow-sm 
                      hover:shadow-md 
                      hover:bg-gray-200 
                      transition-shadow
                    "
                  >
                    {/* User Info */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={request.user.profile_picture || "/default-profile.jpg"}
                        alt={`${request.user.username}'s profile`}
                        className="
                          w-12 h-12 rounded-full border 
                          cursor-pointer object-cover
                        "
                        onClick={() =>
                          setExpandedImage(
                            request.user.profile_picture || "/default-profile.jpg"
                          )
                        }
                        data-tooltip-id={`tooltip-${request.id}`}
                        data-tooltip-content="Click to expand profile picture"
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

                    {/* Eye Icon for Viewing Profile */}
                    <button
                      onClick={() =>
                        setSelectedRequest(
                          selectedRequest?.id === request.id ? null : request
                        )
                      }
                      className="
                        text-gray-600 hover:text-pink-500
                        transition-colors
                      "
                      aria-label="View Profile"
                      data-tooltip-id={`tooltip-view-${request.id}`}
                      data-tooltip-content="View detailed profile"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <Tooltip id={`tooltip-${request.id}`} />
                    <Tooltip id={`tooltip-view-${request.id}`} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No requests for this donation yet.
              </p>
            )}
          </div>

          {/* Detailed Profile for Selected Request */}
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
                    className="
                      w-16 h-16 
                      rounded-full 
                      border 
                      cursor-pointer 
                      object-cover
                    "
                    onClick={() =>
                      setExpandedImage(
                        selectedRequest.user.profile_picture || "/default-profile.jpg"
                      )
                    }
                    data-tooltip-id={`tooltip-expanded-${selectedRequest.id}`}
                    data-tooltip-content="Click to expand"
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
                  className="
                    mt-4 w-full 
                    py-2 
                    bg-pink-500 
                    text-white 
                    rounded-lg 
                    hover:bg-pink-600 
                    transition-colors
                  "
                >
                  Approve {selectedRequest.user.username}
                </button>
                <Tooltip id={`tooltip-expanded-${selectedRequest.id}`} />
              </div>
            </div>
          )}

          {/* Close Button (Bottom) */}
          <div className="px-6 pb-6">
            <button
              onClick={onClose}
              className="
                mt-4 w-full 
                py-2 
                bg-gray-200 
                text-gray-800 
                rounded-lg 
                hover:bg-gray-300 
                transition-colors
              "
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <div
          className="
            fixed inset-0 
            bg-black bg-opacity-80 
            flex items-center justify-center 
            z-50 
            animate-fadeIn
          "
          onClick={closeExpandedImage}
        >
          <img
            src={expandedImage}
            alt="Expanded Profile"
            className="max-w-full max-h-full rounded-lg object-cover"
          />
          <button
            onClick={closeExpandedImage}
            className="
              absolute top-4 right-4 
              text-white 
              bg-black bg-opacity-70 
              rounded-full p-2 
              hover:bg-opacity-90 
              transition-colors
            "
            aria-label="Close expanded profile picture"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
};

export default SideModal;
