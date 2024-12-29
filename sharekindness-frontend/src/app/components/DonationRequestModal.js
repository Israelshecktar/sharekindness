import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestModal = ({ donation, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Validate quantity input
  const validateQuantity = (value) => {
    if (donation.status === "CLOSED") return "This donation is closed and no longer accepts requests.";
    if (value > donation.quantity) return "Requested quantity exceeds available quantity.";
    if (value < 1) return "Requested quantity must be at least 1.";
    return "";
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10) || 0;
    const errorMessage = validateQuantity(value);
    if (errorMessage) {
      toast.error(errorMessage);
    }
    setQuantity(value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const quantityError = validateQuantity(quantity);
    if (quantityError) {
      toast.error(quantityError);
      return;
    }
  
    setIsLoading(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/requests/`;
    const payload = {
      donation: donation.id,
      requested_quantity: quantity,
      comments: comment,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const responseData = await response.json();
        toast.error(responseData.detail || "Failed to submit request.");
        throw new Error(responseData.detail || "Failed to submit request.");
      }
  
      toast.success("Request submitted successfully!");
      // Do NOT close the modal; allow the user to continue viewing the item
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
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

        {/* Modal Title */}
        <h2 className="text-2xl font-bold text-pink-500 text-center mb-4">
          Request {donation.item_name}
        </h2>

        {/* Donation Details */}
        <div className="text-sm text-gray-700 space-y-2 mb-6">
          <p>
            <span className="font-semibold">Available Quantity:</span> {donation.quantity}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`${
                donation.status === "CLOSED" ? "text-red-500" : "text-green-500"
              }`}
            >
              {donation.status}
            </span>
          </p>
        </div>

        {/* Quantity and Comment Inputs */}
        <div className="space-y-4">
          {/* Quantity Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Quantity</label>
            <input
              type="number"
              min="1"
              max={donation.quantity}
              value={quantity}
              onChange={handleQuantityChange}
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter the requested quantity"
              disabled={donation.status === "CLOSED"}
            />
          </div>

          {/* Comment Input */}
          <div>
            <label className="block text-gray-600 font-medium mb-1">Optional Comment</label>
            <textarea
              maxLength={250}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Add a comment (optional)"
            />
            <p className="text-sm text-gray-500 mt-1">{comment.length} / 250 characters</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              isLoading ||
              quantity < 1 ||
              quantity > donation.quantity ||
              donation.status === "CLOSED"
            }
            className={`py-2 px-4 font-semibold rounded-md transition-all ${
              isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-yellow-500 text-white hover:from-pink-600 hover:to-yellow-600"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Request"}
          </button>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default RequestModal;
