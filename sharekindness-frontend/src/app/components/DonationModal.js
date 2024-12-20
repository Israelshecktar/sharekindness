const DonationModal = ({ onClose }) => {
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
  
          <form className="space-y-4">
            {/* Category Field */}
            <div>
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                className="w-full border border-gray-300 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
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
                className="w-full border border-gray-300 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter the item name"
              />
            </div>
  
            {/* Quantity Field */}
            <div>
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full border border-gray-300 p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Enter quantity"
              />
            </div>
  
            {/* Image Upload Field */}
            <div>
              <label className="block text-gray-700 mb-2">Attach Pictures (Max 2)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                onChange={(e) => {
                  if (e.target.files.length > 2) {
                    alert("You can only upload a maximum of 2 pictures.");
                    e.target.value = ""; // Clear the field if more than 2 files are selected
                  }
                }}
              />
              <p className="text-sm text-gray-500 mt-1">
                You must upload at least 1 picture. Maximum 2 allowed.
              </p>
            </div>
  
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold rounded-full hover:scale-105 transition-all"
              >
                Submit Donation
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default DonationModal;
  