import React, { useState, useEffect } from "react";
import AdoptionCard from "../Fundpg/AdoptationCard";
import { useDonationStore } from "../../store/donation";
import { ChevronDown } from "lucide-react";

function Adopt() {
  const { fetchDonations, donations } = useDonationStore();
  const [visibleDonations, setVisibleDonations] = useState(3); // State to manage visible donations
  const [showAll, setShowAll] = useState(false); // State to toggle "Show More"

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  // Function to toggle visibility of all donations
  const toggleShowAll = () => {
    setShowAll(!showAll);
    setVisibleDonations(showAll ? 3 : donations.length); // Show all or only 3 donations
  };

  console.log("donations", donations);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
          Adopt a Species
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-12">
          Support an endangered species by adopting it symbolically. Your
          contributions help fund conservation efforts and protect their
          habitat.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.slice(0, visibleDonations).map((donation) => (
            <AdoptionCard key={donation.id} donation={donation} />
          ))}
        </div>
        {donations.length === 0 && (
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-600">No adoptions found 😢 </p>
          </div>
        )}
      </div>
      {/* Show More Button */}
      {donations.length > 3 && (
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
  );
}

export default Adopt;