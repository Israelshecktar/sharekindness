const DonationCard = ({ title, category, quantity, image, status }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-all">
      {/* Donation Image */}
      {image ? (
        <img src={image} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
      ) : (
        <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded-md mb-4">
          <span className="text-gray-600 text-sm">No Image</span>
        </div>
      )}

      {/* Title and Details */}
      <h4 className="text-lg font-bold text-pink-600 mb-2">{title}</h4>
      <p className="text-sm text-gray-700 mb-1">Category: {category}</p>
      <p className="text-sm text-gray-700 mb-1">Quantity: {quantity}</p>
      <p className="text-sm text-gray-700 mb-2">Status: {status}</p>

      {/* Action Button */}
      <button 
        className="mt-3 w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-all"
      >
        Request
      </button>
    </div>
  );
};

export default DonationCard;
