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

  // Categories (Sentence case for UI)
  const categories = ["All", "Food", "Clothes", "Books", "Electronics", "Other"];

  // Fetch donations from backend
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
          const errorMessage = errorData.detail || "Failed to fetch donations.";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();

        // Ensure absolute URLs for images
        const donationsWithAbsoluteImages = data.map((donation) => ({
          ...donation,
          image: donation.image.startsWith("http")
            ? donation.image
            : `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/${donation.image.replace(/^\//, "")}`,
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

  // Convert category to uppercase for backend filtering
  const formatCategoryForBackend = (category) =>
    category === "All" ? category : category.toUpperCase();

  // Filter donations by category and search query
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
    <section className="p-4 bg-blue-100 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Category Filter for mobile */}
      <div className="block sm:hidden mb-4">
        <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-full 
                ${
                  selectedCategory === category
                    ? "bg-pink-600 text-white"
                    : "bg-blue-200 text-blue-800 hover:bg-blue-300"
                } 
                transition-colors`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter and Search for larger screens */}
      <div className="hidden sm:flex flex-row text-black justify-between items-center mb-6 gap-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">
            Loading donations...
          </p>
        ) : filteredDonations.length > 0 ? (
          filteredDonations.map((donation) => (
            <DonationCard
              key={donation.id}
              title={donation.item_name}
              category={donation.category}
              quantity={donation.quantity}
              image={donation.image} // absolute image URL
              status={donation.status}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No donations match your search or perhaps you need to{" "}
            <a href="/auth" className="text-pink-600">
              Sign In
            </a>
          </p>
        )}
      </div>
    </section>
  );
};

export default DonationsGrid;
