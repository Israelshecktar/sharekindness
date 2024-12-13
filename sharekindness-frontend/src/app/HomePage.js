
"use client";

import { useState } from "react";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="bg-pink-500 p-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">SHAREKINDNESS</div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
          <div className={`md:flex ${menuOpen ? "block" : "hidden"} space-x-4`}>
            <a href="/" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200">Home</a>
            <a href="/donations" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200">Donations</a>
            <a href="/requests" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200">Requests</a>
            <a href="/profile" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-gray-200">Profile</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">Welcome to SHAREKINDNESS</h1>
        <p className="text-lg mb-4">Your platform to share and receive kindness.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Donate Items</h2>
            <p>Share your unused items with those in need.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Request Items</h2>
            <p>Request items that you need from the community.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">View Donations</h2>
            <p>See what others have donated and claim items.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;