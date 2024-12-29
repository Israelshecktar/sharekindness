import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DonationModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    category: "",
    itemName: "",
    quantity: 1,
    description: "",
    image: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Validate file type
    const validImages = files.filter((file) =>
      ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    );
    if (validImages.length < files.length) {
      toast.error("Only JPEG, PNG, and GIF files are allowed.");
    }

    // Limit to 2 images
    if (validImages.length > 2) {
      toast.error("You can only upload a maximum of 2 images.");
      return;
    }

    setFormData((prev) => ({ ...prev, image: validImages }));
    setImagePreviews(validImages.map((file) => URL.createObjectURL(file)));
  };

  // Handle image removal
  const handleRemoveImage = (index) => {
    const updatedImages = formData.image.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, image: updatedImages }));
    setImagePreviews(updatedImages.map((file) => URL.createObjectURL(file)));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.category) {
      toast.error("Please select a category.");
      return;
    }
    if (!formData.itemName.trim()) {
      toast.error("Item name cannot be empty.");
      return;
    }
    if (formData.quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }
    if (formData.image.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setLoading(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/donations/`;
    const formPayload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      const backendKey = key === "itemName" ? "item_name" : key;
      if (backendKey === "image") {
        value.forEach((file) => formPayload.append("image", file));
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
        toast.error(errorData.detail || "Failed to submit donation.");
        throw new Error(errorData.detail || "Failed to submit donation.");
      }

      toast.success("Donation created successfully!");
      setTimeout(onClose, 3000);
    } catch (error) {
      console.error("Error submitting donation:", error);
      toast.error(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-pink-500 text-center">Make a Donation</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 text-black focus:ring-pink-500"
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="FOOD">Food</option>
              <option value="CLOTHES">Clothes</option>
              <option value="BOOKS">Books</option>
              <option value="ELECTRONICS">Electronics</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Item Name */}
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

          {/* Quantity */}
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

          {/* Description */}
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

          {/* Images */}
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
            <div className="mt-4 flex space-x-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <img
                    src={src}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
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

export default DonationModal;
