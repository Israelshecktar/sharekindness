"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import modular components for the landing page
import AuthHeroSection from "./components/LandingHero";
import FeatureSession from "./components/FeatureSession";
import TestimonialSession from "./components/TestimonialSession";
import AboutUsSection from "./components/AboutUs";
import HowItWorksSection from "./components/HowItWorks";
import ImpactStatisticsSection from "./components/ImpactStatistics";
import FAQsSection from "./components/Faq";
import AuthHeaderPage from "./components/LandingHeader";
import AuthFooterPage from "./components/LandingFooter";

const LandingPage = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
        {/* Landing Page Header */}
        <AuthHeaderPage />

        {/* Hero Section */}
        <AuthHeroSection />

        {/* Features Section */}
        <FeatureSession />

        {/* About Us Section */}
        <AboutUsSection />

        {/* How It Works Section */}
        <HowItWorksSection />

        {/* Impact Statistics Section */}
        <ImpactStatisticsSection />

        {/* Testimonials Section */}
        <TestimonialSession />

        {/* FAQs Section */}
        <FAQsSection />

        {/* Landing Page Footer */}
        <AuthFooterPage />
      </div>
    </>
  );
};

export default LandingPage;
