import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-pink-500 text-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src="/sk1.svg" alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
          <h1 className="text-xl sm:text-2xl font-bold">SHAREKINDNESS</h1>
        </div>

        {/* Menu Button */}
        <button
          className="block sm:hidden p-2 bg-white text-pink-500 rounded-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5M3.75 12.75h16.5M3.75 19.5h16.5"
            />
          </svg>
        </button>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-2/3 bg-white text-pink-500 p-5 transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } transition duration-300 ease-in-out sm:hidden`}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setMenuOpen(false)}
          >
            &times;
          </button>
          <nav className="space-y-4 mt-10">
            <a href="#" className="block text-lg font-semibold hover:text-pink-600">
              Home
            </a>
            <a href="#" className="block text-lg font-semibold hover:text-pink-600">
              Donations
            </a>
            <a href="#" className="block text-lg font-semibold hover:text-pink-600">
              Profile
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
