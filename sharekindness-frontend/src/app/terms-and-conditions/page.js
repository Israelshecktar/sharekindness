"use client";

import LandingFooter from "../LandingPage/components/LandingFooter";
import Header from "../components/Header";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          ShareKindness – Terms and Conditions
        </h1>
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <p className="text-gray-700">
            <strong>Effective Date:</strong> February 17, 2025
          </p>

          <section className="mt-6 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">1. Introduction</h2>
              <p className="text-gray-700">
                Welcome to ShareKindness! By accessing and using our platform, you agree to comply with the following Terms and Conditions. These Terms govern your use of our services, including listing, requesting, and claiming items through our platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">2. Purpose of ShareKindness</h2>
              <p className="text-gray-700">
                ShareKindness is a community-driven platform where individuals can donate and request items for free. Our goal is to foster generosity while ensuring safety and accountability in all transactions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">3. Eligibility</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Be at least 18 years old or have parental/guardian supervision.</li>
                <li>Provide accurate personal details during registration.</li>
                <li>Agree to abide by these Terms and applicable laws.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">4. General Guidelines</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li><strong>No Monetary Transactions:</strong> ShareKindness is strictly for free item donations. Users must not request money or attempt to sell items.</li>
                <li><strong>Safe Exchanges:</strong> All exchanges must take place in <span className="font-semibold">public locations</span>. Private or undisclosed meet-ups are prohibited.</li>
                <li><strong>Item Condition:</strong> Donors must provide honest descriptions of the item’s condition. ShareKindness is not responsible for the quality or usability of donated items.</li>
                <li><strong>No Illegal Items:</strong> Users must not list or request prohibited items, including but not limited to weapons, drugs, expired food, counterfeit goods, and hazardous materials.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">5. Requesting & Claiming Items</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Users can request up to five items at a time.</li>
                <li>Donors will decide who receives the item based on their discretion.</li>
                <li>Once a donation has been fully claimed, its status will be marked as <span className="font-semibold">"Claimed by [Recipient’s Username]"</span>.</li>
                <li>Recipients must confirm receipt by marking the item as "Claimed."</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">6. Donor Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Ensure items are in usable condition unless clearly stated otherwise.</li>
                <li>Arrange a safe and public place for handovers.</li>
                <li>Update item status if it has been claimed or is no longer available.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">7. Recipient Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Only request items you genuinely need.</li>
                <li>Pick up the item at the agreed location and confirm receipt.</li>
                <li>Do not engage in fraudulent claims or misuse the platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">8. Privacy and Security</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Personal information will be handled per our Privacy Policy.</li>
                <li>Users should not share sensitive personal details with others on the platform.</li>
                <li>ShareKindness does not store financial data as the platform does not support financial transactions.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">9. Prohibited Conduct</h2>
              <ul className="list-disc list-inside text-gray-700">
                <li>Engaging in harassment, abuse, or threats towards other users.</li>
                <li>Listing or requesting prohibited items.</li>
                <li>Misrepresenting item conditions.</li>
                <li>Using multiple accounts to manipulate item requests.</li>
                <li>Attempting to exchange items for cash or other benefits.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">10. Account Suspension & Termination</h2>
              <p className="text-gray-700">
                ShareKindness reserves the right to suspend or terminate accounts if:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Users violate these Terms & Conditions.</li>
                <li>Fraudulent activity is detected.</li>
                <li>Users engage in behavior that threatens the integrity of the platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">11. Limitation of Liability</h2>
              <p className="text-gray-700">
                ShareKindness is not responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>The condition, quality, or safety of exchanged items.</li>
                <li>Any disputes arising between donors and recipients.</li>
                <li>Any loss, damage, or injury resulting from using our platform.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">12. Changes to Terms & Conditions</h2>
              <p className="text-gray-700">
                ShareKindness reserves the right to update these Terms & Conditions at any time. Users will be notified of significant changes via email or platform notifications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">13. Contact Information</h2>
              <p className="text-gray-700">
                If you have questions, contact us at:
              </p>
              <p className="text-pink-500 font-semibold">support@sharekindness.com</p>
            </div>
          </section>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default TermsAndConditions;
