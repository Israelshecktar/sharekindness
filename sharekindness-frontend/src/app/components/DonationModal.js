import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonationModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    quantity: 1,
    description: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length > 2) {
      toast.error("You can only upload a maximum of 2 pictures.");
    } else {
      setFormData((prev) => ({ ...prev, images: Array.from(files) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setLoading(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/donations/`;
    const formPayload = new FormData();

    // Map itemName to item_name for backend compatibility
    Object.entries(formData).forEach(([key, value]) => {
      const backendKey = key === "itemName" ? "item_name" : key;
      if (backendKey === "images") {
        value.forEach((file) => formPayload.append("images", file));
      } else {
        formPayload.append(backendKey, value);
      }
    });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formPayload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.detail || "Failed to submit donation.";
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }

      toast.success("Donation submitted successfully!");

      // Delay for 3 seconds before redirection
      setTimeout(() => {
        onClose(); // Redirects to dashboard or closes modal
      }, 3000);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Determine toast position based on screen size
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth <= 640;
  const toastPosition = isSmallScreen ? "top-right" : "bottom-right";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-pink-500 text-center">Make a Donation</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 text-black focus:ring-pink-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="FOOD">Food</option>
              <option value="CLOTHES">Clothes</option>
              <option value="BOOKS">Books</option>
              <option value="ELECTRONICS">Electronics</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md text-black focus:ring-2 focus:ring-pink-500"
              placeholder="Enter the item name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md text-black focus:ring-2 focus:ring-pink-500"
              min="1"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 text-black focus:ring-pink-500"
              rows="3"
              placeholder="Provide a brief description of the item(s)"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Attach Pictures (Max 2)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 text-black focus:ring-pink-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Upload up to 2 images.</p>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-full hover:scale-105 transition-all"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Donation"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position={toastPosition}
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default DonationModal;