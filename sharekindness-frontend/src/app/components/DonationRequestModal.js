import { useState } from "react";

const DonationRequestModal = ({ donation, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);

    if (value > donation.quantity) {
      setError("Requested quantity exceeds available quantity.");
    } else if (value < 1) {
      setError("Requested quantity must be at least 1.");
    } else {
      setError(""); // Clear the error if input is valid
    }

    setQuantity(value);
  };

  const handleRequestSubmit = () => {
    if (quantity < 1 || quantity > donation.quantity) {
      setError("Please enter a valid quantity.");
      return;
    }
    // Add your API submission logic here
    console.log({
      donationId: donation.id,
      quantity,
      comment,
    });
    onClose(); // Close the modal after successful submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl w-11/12 max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close Modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-4">
          Request {donation.title}
        </h2>

        {/* Donation Details */}
        <div className="text-sm text-gray-700 space-y-2 mb-6">
          <p>
            <span className="font-semibold">Available Quantity:</span>{" "}
            {donation.quantity}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Quantity Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              max={donation.quantity}
              value={quantity}
              onChange={handleQuantityChange}
              className={`w-full p-2 border rounded-md focus:outline-none text-black focus:ring-2 ${
                error ? "border-red-500 focus:ring-red-500" : "focus:ring-pink-500"
              }`}
            />
          </div>

          {/* Comment Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Optional Comment
            </label>
            <textarea
              maxLength={250}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 text-black focus:ring-pink-500"
              placeholder="Add a comment (max 50 words)"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleRequestSubmit}
            disabled={quantity < 1 || quantity > donation.quantity}
            className={`py-2 px-4 font-semibold rounded-md transition-all ${
              quantity < 1 || quantity > donation.quantity
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:from-pink-600 hover:to-yellow-600"
            }`}
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestModal;
