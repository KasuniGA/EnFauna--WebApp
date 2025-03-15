import React from "react";
import { User, MessageSquare, Calendar, MapPin } from "lucide-react";

const VisitorInfoSection = ({ formData, handleInputChange, setActiveSection }) => {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-green-700 dark:text-green-400 mb-4 sm:mb-6 flex items-center">
          <MapPin className="mr-2" size={20} />
          Tell Us About Your Visit
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="relative group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Your Name (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="relative group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </div>

          {/* Visit Date */}
          <div>
            <label
              htmlFor="visitDate"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              When Did You Visit?
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                type="date"
                id="visitDate"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleInputChange}
                className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
          </div>

          {/* Reason for Visit and Companions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="visitReason"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Reason for Visit
              </label>
              <select
                id="visitReason"
                name="visitReason"
                value={formData.visitReason}
                onChange={handleInputChange}
                className="block w-full py-2 sm:py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Select Reason</option>
                <option value="leisure">Leisure</option>
                <option value="education">Education</option>
                <option value="photography">Photography</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="visitCompanions"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Who Joined You?
              </label>
              <select
                id="visitCompanions"
                name="visitCompanions"
                value={formData.visitCompanions}
                onChange={handleInputChange}
                className="block w-full py-2 sm:py-3 px-4 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Select Option</option>
                <option value="family">Family</option>
                <option value="friends">Friends</option>
                <option value="solo">Solo</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end mt-6 sm:mt-8">
        <button
          type="button"
          onClick={() => setActiveSection("ratings")}
          className="w-full sm:w-auto flex items-center justify-center bg-green-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Next: Rate Your Experience
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

export default VisitorInfoSection;