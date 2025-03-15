import React from "react";
import { Star, MessageSquare, Camera } from "lucide-react";

const FeedbackSection = ({
  formData,
  handleInputChange,
  setActiveSection,
  handleClear,
  handleSubmit,
}) => {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-green-700 dark:text-green-400 mb-4 sm:mb-6 flex items-center">
          <MessageSquare className="mr-2" size={20} />
          Share Your Thoughts
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {[
            {
              key: "mostEnjoyedAspect",
              label: "What did you enjoy the most?",
              icon: <Star size={20} className="text-gray-400" />,
            },
            {
              key: "improvementSuggestions",
              label: "What could we improve?",
              icon: <MessageSquare size={20} className="text-gray-400" />,
            },
            {
              key: "notedIssues",
              label: "Did you notice any issues?",
              icon: <Camera size={20} className="text-gray-400" />,
            },
          ].map(({ key, label, icon }) => (
            <div key={key} className="relative">
              <label
                htmlFor={key}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                {label}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                  {icon}
                </div>
                <textarea
                  id={key}
                  name={key}
                  value={formData[key]}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  rows="3"
                  placeholder="Your thoughts..."
                />
              </div>
            </div>
          ))}

          <div className="bg-green-50 dark:bg-gray-700 p-4 sm:p-6 rounded-xl shadow-inner">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Recommend Park */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                  Would you recommend our park?
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="recommendPark"
                      value="yes"
                      checked={formData.recommendPark === "yes"}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          recommendPark: "yes",
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 group-hover:border-green-400 peer-checked:border-green-500 peer-checked:bg-green-50 dark:peer-checked:bg-green-900/30 peer-checked:text-green-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                        />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      Yes
                    </span>
                  </label>

                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="recommendPark"
                      value="no"
                      checked={formData.recommendPark === "no"}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          recommendPark: "no",
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 group-hover:border-red-400 peer-checked:border-red-500 peer-checked:bg-red-50 dark:peer-checked:bg-red-900/30 peer-checked:text-red-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2"
                        />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      No
                    </span>
                  </label>
                </div>
              </div>

              {/* Park Updates */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
                  Would you like to receive park updates?
                </label>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="wantsUpdates"
                      value="yes"
                      checked={formData.wantsUpdates === "yes"}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          wantsUpdates: "yes",
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 group-hover:border-blue-400 peer-checked:border-blue-500 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/30 peer-checked:text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      Yes
                    </span>
                  </label>

                  <label className="relative inline-flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="wantsUpdates"
                      value="no"
                      checked={formData.wantsUpdates === "no"}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          wantsUpdates: "no",
                        }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 group-hover:border-gray-400 peer-checked:border-gray-500 peer-checked:bg-gray-100 dark:peer-checked:bg-gray-700 peer-checked:text-gray-600 dark:peer-checked:text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="ml-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">
                      No
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Comments */}
            <div className="mt-4 sm:mt-6">
              <label
                htmlFor="additionalComments"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Any additional comments?
              </label>
              <textarea
                id="additionalComments"
                name="additionalComments"
                value={formData.additionalComments}
                onChange={handleInputChange}
                className="block w-full p-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                rows="4"
                placeholder="Share any other thoughts you have about your visit..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-6 sm:mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          type="button"
          onClick={() => setActiveSection("ratings")}
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

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={handleClear}
            className="w-full sm:w-auto bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Clear Form
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center bg-green-600 text-white py-2 sm:py-3 px-4 sm:px-8 rounded-lg hover:bg-green-700 transition-colors shadow-md"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;