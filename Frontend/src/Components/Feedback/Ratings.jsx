import React from "react";
import { Star, Leaf, User, MapPin, MessageSquare, Coffee } from "lucide-react";

const RatingsSection = ({ formData, handleStarClick, setActiveSection }) => {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-green-700 dark:text-green-400 mb-4 sm:mb-6 flex items-center">
          <Star className="mr-2" size={20} />
          Rate Your Experience
        </h2>

        <div className="bg-green-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl shadow-inner space-y-4 sm:space-y-6">
          {[
            {
              key: "cleanliness",
              label: "Cleanliness of the Park",
              icon: <Leaf size={20} className="text-green-500" />,
            },
            {
              key: "staffHelpfulness",
              label: "Staff Helpfulness",
              icon: <User size={20} className="text-green-500" />,
            },
            {
              key: "animalEnclosures",
              label: "Animal Enclosures",
              icon: <MapPin size={20} className="text-green-500" />,
            },
            {
              key: "educationalInfo",
              label: "Educational Information",
              icon: <MessageSquare size={20} className="text-green-500" />,
            },
            {
              key: "foodServices",
              label: "Food and Beverage Services",
              icon: <Coffee size={20} className="text-green-500" />,
            },
            {
              key: "overallSatisfaction",
              label: "Overall Satisfaction",
              icon: <Star size={20} className="text-green-500" />,
            },
          ].map(({ key, label, icon }) => (
            <div
              key={key}
              className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center mb-2 sm:mb-0">
                  {icon}
                  <label className="ml-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                    {label}
                  </label>
                </div>
                <div className="flex space-x-1 sm:space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      type="button"
                      key={rating}
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center focus:outline-none transition-colors ${
                        formData[key] >= rating
                          ? "bg-yellow-400 text-yellow-800"
                          : "bg-gray-100 dark:bg-gray-600 text-gray-400 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-500"
                      }`}
                      onClick={() => handleStarClick(key, rating)}
                    >
                      <Star
                        size={14}
                        className={
                          formData[key] >= rating ? "fill-current" : ""
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          onClick={() => setActiveSection("visitor-info")}
          className="w-full sm:w-auto flex items-center justify-center bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Previous
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("feedback")}
          className="w-full sm:w-auto flex items-center justify-center bg-green-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Next: Leave Comments
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RatingsSection;