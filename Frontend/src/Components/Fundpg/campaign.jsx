import React, { useState, useEffect } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { useCampaignStore } from "../../store/campaign";
import Paypal from "./PayPal"; // Adjust path as needed

const Campaign = () => {
  const { fetchCampaigns, campaigns } = useCampaignStore();
  const [visibleCampaigns, setVisibleCampaigns] = useState(3);
  const [showAll, setShowAll] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState(null); 
  const [showBankInfo, setShowBankInfo] = useState(false);


  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setVisibleCampaigns(showAll ? 3 : campaigns.length);
  };

  const openModal = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
    setDonationAmount(null); // Reset amount on open
  };

  const closeModal = () => {
    setSelectedCampaign(null);
    setIsModalOpen(false);
    setDonationAmount(null); // Reset on close
  };

  return (
    <div>
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500" />
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Active Campaigns
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-12">
          Support an endangered species by adopting it symbolically. Your
          contributions help fund conservation efforts and protect their
          habitat.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.slice(0, visibleCampaigns).map((campaign) => (
            <div
              key={campaign.id}
              className="bg-white rounded-lg shadow-md overflow-hidden dark:bg-gray-800 dark:text-white"
            >
              <img
                src={campaign.image}
                alt={campaign.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{campaign.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {campaign.description}
                </p>
                <div className="mb-4">
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div
                      className="h-2 bg-green-600 rounded-full"
                      style={{
                        width: `${(campaign.raised / campaign.goal) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm">
                    <span>${campaign.raised.toLocaleString()} raised</span>
                    <span>${campaign.goal.toLocaleString()} goal</span>
                  </div>
                </div>
                <button
                  onClick={() => openModal(campaign)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                >
                  Donate Now
                </button>
                <button
                  onClick={() => setShowBankInfo(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors mt-2"
                >
                  Bank / Wire Transfer
                </button>
                {showBankInfo && (
                  <div className="mt-4 p-4 bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-300 rounded-lg">
                    <p className="text-sm mb-2">
                      If this method is easier for you, drop us a message for
                      the bank / wire transfer instructions.
                    </p>
                    <button
                      onClick={() => (window.location.href = "/contact")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                    >
                      Contact Us
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {campaigns.length > 3 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={toggleShowAll}
              className="flex items-center text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-600 transition-colors"
            >
              {showAll ? "Show Less" : "Show More"}
              <ChevronDown
                className={`ml-2 w-5 h-5 transition-transform ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </section>

      {/* Modal */}
      {isModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">
              Donate to {selectedCampaign.name}
            </h2>

            {/* Amount Selection */}
            <div className="flex justify-center gap-4 mb-6">
              {[5, 10, 25].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount)}
                  className={`px-4 py-2 rounded-full border ${
                    donationAmount === amount
                      ? "bg-green-600 text-white"
                      : "text-gray-800 dark:text-white border-gray-400"
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>

            {/* PayPal button (after selecting amount) */}
            {donationAmount && (
              <div className="w-full max-w-md mx-auto px-4">
                <Paypal
                  amount={donationAmount}
                  description={`Donation to ${selectedCampaign.name}`}
                  onClose={closeModal}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaign;
