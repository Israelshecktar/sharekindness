import { useState } from "react";
import DonationRequestModal from "./DonationRequestModal"; // Import the correct modal

const DonationCard = ({ id, item_name, category, quantity, image, status, requestsCount }) => {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const formatText = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

  const imageUrl = image?.startsWith("http")
    ? image
    : image
    ? `${process.env.NEXT_PUBLIC_API_URL}/${image.replace(/^\//, "")}`
    : null;

  const handleOpenRequestModal = () => setIsRequestModalOpen(true);
  const handleCloseRequestModal = () => setIsRequestModalOpen(false);
  const handleOpenImageModal = () => setIsImageModalOpen(true);
  const handleCloseImageModal = () => setIsImageModalOpen(false);

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-2">
      {/* Donation Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={item_name || "Donation image"}
          className="w-full h-48 object-cover rounded-md mb-4 cursor-pointer"
          loading="lazy"
          onClick={handleOpenImageModal}
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center rounded-md mb-4">
          <span className="text-gray-600 text-sm">No Image Available</span>
        </div>
      )}

      {/* Title */}
      <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-2">
        {formatText(item_name)}
      </h4>

      {/* Details */}
      <div className="text-gray-700 text-sm space-y-1 mb-4">
        <p>
          <span className="font-semibold text-gray-900">Category:</span>{" "}
          {formatText(category)}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Quantity:</span>{" "}
          {quantity}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Requests:</span>{" "}
          {requestsCount} / 5
        </p>
        <p>
          <span className="font-semibold text-gray-900">Status:</span>{" "}
          <span
            className={`${
              status === "AVAILABLE"
                ? "text-green-500"
                : status === "CLOSED"
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {formatText(status)}
          </span>
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={handleOpenRequestModal}
        disabled={status === "CLOSED" || requestsCount >= 5}
        className={`w-full py-3 font-semibold rounded-md transition-all ${
          status === "CLOSED" || requestsCount >= 5
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:from-pink-600 hover:to-yellow-600"
        }`}
        aria-label={`Request ${item_name || "donation"}`}
      >
        {status === "CLOSED" || requestsCount >= 5 ? "Request Closed" : "Request"}
      </button>

      {/* Request Modal */}
      {isRequestModalOpen && (
        <DonationRequestModal
          donation={{
            id,
            item_name,
            quantity,
          }}
          onClose={handleCloseRequestModal}
        />
      )}

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="relative">
            <button
              onClick={handleCloseImageModal}
              className="absolute top-4 right-4 text-white bg-gray-800 rounded-full p-2 hover:bg-gray-600"
              aria-label="Close Image Modal"
            >
              ✕
            </button>
            <img
              src={imageUrl}
              alt={item_name || "Donation full-size image"}
              className="max-w-full max-h-screen rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationCard;
