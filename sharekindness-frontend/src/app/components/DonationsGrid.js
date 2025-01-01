import { useState, useEffect } from "react";
import CategoryFilter from "./CategoryFilter";
import DonationCard from "./DonationsCard"; 
import SearchBar from "./SearchBar";
import { toast, ToastContainer } from "react-toastify";

const DonationsGrid = () => {
  const [donations, setDonations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = ["All", "Food", "Clothes", "Books", "Electronics", "Other"];

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}api/donations/`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.detail || "Failed to fetch donations.");
          throw new Error(errorData.detail || "Failed to fetch donations.");
        }

        const data = await response.json();

        const donationsWithAbsoluteImages = data.map((donation) => ({
          ...donation,
          image: donation.image.startsWith("http")
            ? donation.image
            : `${
                process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
              }/${donation.image.replace(/^\//, "")}`,
        }));

        setDonations(donationsWithAbsoluteImages);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const formatCategoryForBackend = (category) =>
    category === "All" ? category : category.toUpperCase();

  const filteredDonations = donations.filter((donation) => {
    const backendCategory = formatCategoryForBackend(selectedCategory);
    const matchesCategory =
      backendCategory === "All" || donation.category === backendCategory;
    const matchesSearch = donation.item_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Outer Section with Extra Bottom Padding */}
      <section
        className="
          min-h-screen
          bg-gradient-to-b from-blue-50 to-blue-100
          py-8
          px-4
          pb-32  /* <-- increased bottom padding so last cards won't overlap footer */
        "
      >
        <div className="max-w-7xl mx-auto">
          {/* Mobile Category Pills */}
          <div className="block sm:hidden mb-6">
            <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    flex-shrink-0
                    px-4 py-2
                    text-sm
                    font-semibold
                    rounded-full
                    whitespace-nowrap
                    border border-transparent
                    transition-colors
                    ${
                      selectedCategory === category
                        ? "bg-pink-600 text-white"
                        : "bg-blue-200 text-blue-800 hover:bg-blue-300"
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Filter + Search */}
          <div
            className="
              hidden
              sm:flex
              flex-row
              justify-between
              items-center
              mb-8
              gap-4
            "
          >
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <SearchBar onSearch={setSearchQuery} />
          </div>

          {/* Donations Grid */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-6
              animate-fadeIn
            "
          >
            {loading ? (
              <div className="col-span-full flex items-center justify-center">
                {/* Loading Spinner */}
                <div className="flex flex-col items-center space-y-2">
                  <svg
                    className="animate-spin h-8 w-8 text-pink-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  <p className="text-gray-600">Loading donations...</p>
                </div>
              </div>
            ) : filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => (
                <DonationCard
                  key={donation.id}
                  id={donation.id}
                  item_name={donation.item_name}
                  category={donation.category}
                  quantity={donation.quantity}
                  image={donation.image}
                  status={donation.status}
                  donorName={donation.donor_name}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No donations match your search or perhaps you need to{" "}
                <a href="/auth" className="text-pink-600 underline">
                  Sign In
                </a>
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DonationsGrid;
