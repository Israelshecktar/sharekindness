import { useState } from "react";

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
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 2) {
      alert("You can only upload a maximum of 2 pictures.");
      return;
    }
    setFormData({ ...formData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert("You must upload at least one image.");
      return;
    }

    setLoading(true);

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/donations/`;
    const formPayload = new FormData();
    formPayload.append("category", formData.category);
    formPayload.append("item_name", formData.itemName);
    formPayload.append("quantity", formData.quantity);
    formPayload.append("description", formData.description);
    formData.images.forEach((image) => {
      formPayload.append("images", image);
    });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the donation. Please try again.");
      }

      alert("Donation submitted successfully!");
      onClose();
    } catch (error) {
      console.error(error.message);
      alert("An error occurred while submitting your donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-pink-500 text-center">
          Make a Donation
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Category Field */}
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="food">Food</option>
              <option value="clothes">Clothes</option>
              <option value="books">Books</option>
              <option value="electronics">Electronics</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Item Name Field */}
          <div>
            <label className="block text-gray-700 mb-2">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter the item name"
              required
            />
          </div>

          {/* Quantity Field */}
          <div>
            <label className="block text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              min="1"
              className="w-full border border-gray-300 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter quantity"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Provide a brief description of the item(s)"
              rows="3"
              required
            ></textarea>
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-gray-700 mb-2">Attach Pictures (Max 2)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-pink-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload 1-2 images to represent your donation.
            </p>
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
    </div>
  );
};

export default DonationModal;
