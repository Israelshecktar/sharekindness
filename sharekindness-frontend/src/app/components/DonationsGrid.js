import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import DonationCard from "./DonationsCard";
import SearchBar from "./SearchBar";

const DonationsGrid = ({ donations }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Food", "Clothes", "Books", "Electronics", "Other"];

  // Filter donations by category and search
  const filteredDonations = donations.filter((donation) => {
    const matchesCategory =
      selectedCategory === "All" || donation.category === selectedCategory;
    const matchesSearch = donation.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <SearchBar onSearch={setSearchQuery} />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDonations.length > 0 ? (
          filteredDonations.map((donation) => (
            <DonationCard
              key={donation.id}
              title={donation.title}
              category={donation.category}
              quantity={donation.quantity}
              image={donation.image || null}
              status={donation.status}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No donations match your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default DonationsGrid;
