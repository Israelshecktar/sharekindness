"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import DonationsGrid from "../components/DonationsGrid";
import Footer from "../components/Footer";

const Dashboard = () => {
  const [donations, setDonations] = useState([]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Donations Grid */}
      <DonationsGrid donations={donations} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
