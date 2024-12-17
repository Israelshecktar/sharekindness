const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
      <div className="flex overflow-x-auto gap-3 px-4 py-2 bg-gray-100 rounded-md">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition ${
              selectedCategory === category
                ? "bg-pink-500 text-white"
                : "bg-white text-gray-700 border border-gray-300"
            } hover:bg-pink-500 hover:text-white`}
          >
            {category}
          </button>
        ))}
      </div>
    );
  };
  
  export default CategoryFilter;
  