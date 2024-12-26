const DonationCard = ({ title, category, quantity, image, status }) => {
  // Helper function to format text
  const formatText = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

  // Use `image` directly if it's already a full URL
  const imageUrl = image?.startsWith("http")
    ? image
    : image
    ? `${process.env.NEXT_PUBLIC_API_URL}/${image.replace(/^\//, "")}`
    : null;

  console.log("Constructed Image URL:", imageUrl); // Debugging log

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-all transform hover:-translate-y-2">
      {/* Donation Image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title || "Donation image"}
          className="w-full h-48 object-cover rounded-md mb-4"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center rounded-md mb-4">
          <span className="text-gray-600 text-sm">No Image Available</span>
        </div>
      )}

      {/* Title */}
      <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500 mb-2">
        {formatText(title)}
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
          <span className="font-semibold text-gray-900">Status:</span>{" "}
          <span
            className={`${
              status === "AVAILABLE" ? "text-green-500" : "text-red-500"
            }`}
          >
            {formatText(status)}
          </span>
        </p>
      </div>

      {/* Action Button */}
      <button
        className="w-full py-3 text-white font-semibold rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 transition-all"
        aria-label={`Request ${title || "donation"}`}
      >
        Request
      </button>
    </div>
  );
};

export default DonationCard;
