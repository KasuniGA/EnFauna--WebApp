import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSpotlightStore } from "../../store/spotlight.js";

const Toast = ({ message, type, onClose }) => (
  <div className="fixed top-4 right-4 flex items-center gap-2 min-w-[300px] p-4 text-white rounded-lg shadow-lg animate-slide-in">
    <div
      className={`${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } p-4 rounded-lg flex items-center justify-between w-full`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 hover:opacity-70 transition-opacity"
      >
        ×
      </button>
    </div>
  </div>
);

const SpotlightSection = () => {
  const [currentSpotlight, setCurrentSpotlight] = useState(0);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // State for image modal
  const { spotlights, fetchSpotlight } = useSpotlightStore();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch spotlights on component mount
  useEffect(() => {
    const loadData = async () => {
      await fetchSpotlight();
      setIsLoading(false);
    };
    loadData();
  }, [fetchSpotlight]);

  // Sort spotlights by createdAt in descending order (latest first)
  const sortedSpotlights = [...spotlights].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Handle navigation to the previous card
  const handlePrevious = () => {
    setCurrentSpotlight((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Handle navigation to the next card
  const handleNext = () => {
    setCurrentSpotlight((prev) =>
      prev < sortedSpotlights.length - 1 ? prev + 1 : prev
    );
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="text-center py-12 text-white dark:text-white">
        Loading...
      </div>
    );
  }

  // Handle empty state
  if (sortedSpotlights.length === 0) {
    return (
      <div className="text-center space-y-4">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No spotlight found 😢
        </p>
      </div>
    );
  }

  const spotlight = sortedSpotlights[currentSpotlight];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Species Spotlight
          </h1>

          <div className="flex items-center gap-4">
            {/* Navigation arrows */}
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentSpotlight === 0}
                className={`bg-gray-200 dark:bg-gray-700 p-2 rounded-full ${
                  currentSpotlight === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                aria-label="Previous spotlight"
              >
                <ChevronLeft
                  size={20}
                  className="text-gray-700 dark:text-gray-200"
                />
              </button>

              <button
                onClick={handleNext}
                disabled={currentSpotlight === sortedSpotlights.length - 1}
                className={`bg-gray-200 dark:bg-gray-700 p-2 rounded-full ${
                  currentSpotlight === sortedSpotlights.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                aria-label="Next spotlight"
              >
                <ChevronRight
                  size={20}
                  className="text-gray-700 dark:text-gray-200"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-800 overflow-hidden rounded-lg shadow-lg">
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() =>
                setToast({ show: false, message: "", type: "success" })
              }
            />
          )}

          {/* Left side - Image */}
          <div className="lg:w-1/2 relative">
            {/* Featured Species tag positioned in the top left corner */}
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm flex items-center">
                Featured Species
              </span>
            </div>

            {/* Clickable image to open modal */}
            <img
              src={spotlight.image}
              alt={spotlight.name}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setIsImageModalOpen(true)} // Open modal on click
            />
          </div>

          {/* Right side - Content */}
          <div className="lg:w-1/2 p-8 dark:bg-gray-800 text-gray-800 dark:text-white">
            <div className="mt-4 text-sm text-gray-500">
              {new Date(spotlight.createdAt).toLocaleDateString("en-US", {
                weekday: "long", // Full weekday name (e.g., "Friday")
                day: "numeric", // Day of the month (e.g., "28")
                month: "long", // Full month name (e.g., "February")
                year: "numeric", // Full year (e.g., "2025")
              })}
            </div>
            <h2 className="text-3xl font-bold mb-8">{spotlight.name}</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Habitat & Population
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {spotlight.habitat}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {spotlight.population}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Current Threats</h3>
                <ul className="space-y-2">
                  {spotlight.threats.split("|").map((threat, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {threat.trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Conservation Efforts
                </h3>
                <ul className="space-y-2">
                  {spotlight.efforts.split("|").map((effort, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-2">•</span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {effort.trim()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Active Programs</h3>
                {spotlight.programs.split(",").map((program, index) => {
                  const [title, description] = program.split(":");
                  return (
                    <div
                      key={index}
                      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-3"
                    >
                      <h4 className="font-semibold text-gray-800 dark:text-white">
                        {title.trim()}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                        {description?.trim()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination indicators */}
        <div className="mt-8 flex justify-center">
          <div className="flex gap-2">
            {sortedSpotlights.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSpotlight(index)}
                className={`${
                  currentSpotlight === index
                    ? "bg-green-500 w-6"
                    : "bg-gray-300 dark:bg-gray-600"
                } h-3 rounded-full transition-all`}
                style={{
                  width: currentSpotlight === index ? "24px" : "12px",
                }}
                aria-label={`Go to spotlight ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setIsImageModalOpen(false)} // Close modal on click outside
        >
          <div className="relative max-w-4xl w-full p-4">
            <img
              src={spotlight.image}
              alt={spotlight.name}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} className="text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotlightSection;
