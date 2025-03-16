import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCampaignStore } from "../../store/campaign";


const Campaign = () => {
  const { fetchCampaigns, campaigns } = useCampaignStore();
  const [visibleCampaigns, setVisibleCampaigns] = useState(3); // State to manage visible campaigns
  const [showAll, setShowAll] = useState(false); // State to toggle "Show More"

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  // Function to toggle visibility of all campaigns
  const toggleShowAll = () => {
    setShowAll(!showAll);
    setVisibleCampaigns(showAll ? 3 : campaigns.length); // Show all or only 3 campaigns
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

      {/* Active Campaigns */}
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
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Show More Button */}
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
    </div>
  );
};

export default Campaign;
