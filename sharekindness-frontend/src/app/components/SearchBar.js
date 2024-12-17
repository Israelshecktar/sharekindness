const SearchBar = ({ onSearch }) => {
    return (
      <div className="relative w-full sm:max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search donations..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-3 pl-10 border rounded-full focus:ring-2 focus:ring-pink-500"
        />
        <svg
          className="absolute left-3 top-3 w-6 h-6 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M9.75 17.5A7.75 7.75 0 119.75 2a7.75 7.75 0 010 15.5z"
          />
        </svg>
      </div>
    );
  };
  
  export default SearchBar;
  