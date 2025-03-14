import React, { useState } from "react";
import { Upload, MessageSquare, Star, User, Calendar } from "lucide-react";

const Feedpg = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    visitDate: "",
    visitReason: "",
    visitCompanions: "",
    cleanliness: null,
    staffHelpfulness: null,
    animalEnclosures: null,
    educationalInfo: null,
    foodServices: null,
    overallSatisfaction: null,
    mostEnjoyedAspect: "",
    improvementSuggestions: "",
    notedIssues: "",
    recommendPark: null,
    wantsUpdates: null,
    additionalComments: "",
    uploadedPhotos: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleStarClick = (key, rating) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: rating,
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      uploadedPhotos: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to a backend
    console.log("Submitted Feedback:", formData);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="max-w-2x mx-auto p-10 bg-green-200 dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-lg rounded-lg pt-28 pb-16">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
        Park Visitor Feedback Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Visitor Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <label
              htmlFor="name"
              className="mb-2 flex items-center text-gray-900 dark:text-gray-300"
            >
              <User className="mr-2 text-gray-500" size={20} />
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded border-gray-100 dark:border-gray-700 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
              placeholder="Your name"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="email"
              className="mb-2 flex items-center text-gray-900 dark:text-gray-300"
            >
              <MessageSquare className="mr-2 text-gray-500" size={20} />
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded border-gray-100 dark:border-gray-700 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
              placeholder="Your email"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="visitDate"
              className="mb-2 flex items-center text-gray-900 dark:text-gray-300"
            >
              <Calendar className="mr-2 text-gray-500" size={20} />
              Date of Visit
            </label>
            <input
              type="date"
              id="visitDate"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded border-gray-100 dark:border-gray-700 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
              required
            />
          </div>
        </div>

        {/* Visit Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="visitReason"
              className="block mb-2 text-gray-900 dark:text-gray-300"
            >
              Reason for Visit
            </label>
            <select
              id="visitReason"
              name="visitReason"
              value={formData.visitReason}
              onChange={handleInputChange}
              className="w-full p-2 border rounded border-gray-100 dark:border-gray-700 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
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
              className="block mb-2 text-gray-900 dark:text-gray-300"
            >
              Visited With
            </label>
            <select
              id="visitCompanions"
              name="visitCompanions"
              value={formData.visitCompanions}
              onChange={handleInputChange}
              className="w-full p-2 border rounded border-gray-100 dark:border-gray-700 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
              required
            >
              <option value="">Select Companions</option>
              <option value="family">Family</option>
              <option value="friends">Friends</option>
              <option value="solo">Solo</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Experience Ratings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center text-gray-900 dark:text-gray-300">
            <Star className="mr-2 text-orange-400" size={24} />
            Experience Ratings
          </h3>

          {[
            { key: "cleanliness", label: "Cleanliness of the Park" },
            { key: "staffHelpfulness", label: "Staff Helpfulness" },
            { key: "animalEnclosures", label: "Animal Enclosures" },
            { key: "educationalInfo", label: "Educational Information" },
            { key: "foodServices", label: "Food and Beverage Services" },
            { key: "overallSatisfaction", label: "Overall Satisfaction" },
          ].map(({ key, label }) => (
            <div
              key={key}
              className="flex items-center text-gray-900 dark:text-gray-300"
            >
              <label className="mr-4 w-1/3">{label}</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    size={24}
                    className={`cursor-pointer ${
                      formData[key] >= rating
                        ? "text-orange-400"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleStarClick(key, rating)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Open-ended Questions */}
        <div className="space-y-4 ">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300">
            Your Feedback
          </h3>
          {[
            { key: "mostEnjoyedAspect", label: "What did you enjoy the most?" },
            { key: "improvementSuggestions", label: "What could we improve?" },
            { key: "notedIssues", label: "Did you notice any issues?" },
          ].map(({ key, label }) => (
            <div key={key}>
              <label
                htmlFor={key}
                className="block mb-2 text-gray-900 dark:text-gray-300"
              >
                {label}
              </label>
              <textarea
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded border-gray-100 dark:border-gray-700 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                rows="3"
              />
            </div>
          ))}
        </div>

        {/* Visitor Engagement */}
        <div className="grid md:grid-cols-2 gap-4 text-gray-900 dark:text-gray-300">
          <div>
            <label className="block mb-2">Would you recommend our park?</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center text-gray-900 dark:text-gray-300">
                <input
                  type="radio"
                  name="recommendPark"
                  value="yes"
                  checked={formData.recommendPark === "yes"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, recommendPark: "yes" }))
                  }
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="recommendPark"
                  value="no"
                  checked={formData.recommendPark === "no"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, recommendPark: "no" }))
                  }
                  className="form-radio "
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block mb-2">Want park updates?</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="wantsUpdates"
                  value="yes"
                  checked={formData.wantsUpdates === "yes"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, wantsUpdates: "yes" }))
                  }
                  className="form-radio "
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="wantsUpdates"
                  value="no"
                  checked={formData.wantsUpdates === "no"}
                  onChange={() =>
                    setFormData((prev) => ({ ...prev, wantsUpdates: "no" }))
                  }
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Additional Feedback */}
        <div>
          <label
            htmlFor="additionalComments"
            className="block mb-2 text-gray-900 dark:text-gray-300"
          >
            Additional Comments
          </label>
          <textarea
            id="additionalComments"
            name="additionalComments"
            value={formData.additionalComments}
            onChange={handleInputChange}
            className="w-full p-2 border rounded border-gray-100 dark:border-gray-700 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
            rows="4"
            placeholder="Any other thoughts or suggestions?"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-3xl hover:bg-green-700 transition duration-300"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedpg;
