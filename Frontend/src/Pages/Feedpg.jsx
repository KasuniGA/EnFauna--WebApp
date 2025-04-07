import React, { useState, useEffect } from "react";
import { useFeedbackStore } from "../store/feedback.js"; // Adjust the import path as needed
import VisitorInfoSection from "../Components/Feedback/VisitorInfoSection.jsx";
import RatingsSection from "../Components/Feedback/Ratings.jsx";
import FeedbackSection from "../Components/Feedback/FeedbackSection.jsx";
import { User, Star, MessageSquare } from "lucide-react";

const Feedpg = () => {
  const { submitFeedback, fetchFeedbacks, feedbacks } = useFeedbackStore();
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
  });

  const [activeSection, setActiveSection] = useState("visitor-info");
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

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

  const handleClear = () => {
    setFormData({
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
    });
    setActiveSection("visitor-info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const result = await submitFeedback(formData);
    if (result.success) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        handleClear();
      }, 3000);
    } else {
      alert(`Failed to submit feedback: ${result.message}`);
    }
  };

  return (
    <div className="relative min-h-screen py-10 sm:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background image with overlay for light/dark mode */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1553514029-d1b8c8a7df79?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80)",
        }}
      ></div>
      {/* <div className="absolute inset-0 bg-gradient-to-bl from-green-200 via-green-300 to-green-400 dark:from-gray-950 dark:via-gray-800 dark:to-gray-900 z-0"></div> */}

      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `
      linear-gradient(
        to bottom right,
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.3)
      ),
      url('https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/486327085_3194516987395804_696508427646766679_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFXmUVgq3Q_wuAjEvM1s7HbiVD8xjObqDuJUPzGM5uoO8tXFZHOOGAwqOeks2Qe_UGdg_F6CJPfEQAlr2STo_Ej&_nc_ohc=GxNhiaSsipIQ7kNvwFae1py&_nc_oc=Adm6U2B5Iz3dFa8IXMeyXri_HTpBcLfi1gPG4RSzJpnbO5RNxca9TleMwrm285MVm9I&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=CPS5AmfiBoblsuppYZZGtw&oh=00_AfHMBnqVYtt1AurcJZT5GT5ZLACOoRAXxazJ7-JC6q6s5Q&oe=67F81FB3')
    `,
          backgroundBlendMode: "overlay",
        }}
      ></div>

      <div className="relative max-w-4xl mx-auto z-10">
        {formSubmitted ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-12 text-center transform transition-all duration-500 animate-pulse">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 sm:h-12 sm:w-12 text-white"
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
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2 sm:mb-4">
              Thank You!
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Your feedback helps us improve the park experience for everyone.
            </p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="relative h-32 sm:h-48 bg-green-600 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{
                  backgroundImage:
                    "url(https://i.pinimg.com/736x/cc/44/7e/cc447e273711c8fae6275904056d9347.jpg)",
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/90 to-green-800/90"></div>
              <div className="relative h-full flex items-center justify-center px-4 sm:px-8">
                <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">
                  Park Visitor Feedback
                </h1>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-gradient-to-t from-white dark:from-gray-800 to-transparent"></div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto py-3 sm:py-4 px-4 sm:px-6 bg-green-50 dark:bg-gray-700 border-b border-green-100 dark:border-gray-600">
              <button
                onClick={() => setActiveSection("visitor-info")}
                className={`flex items-center px-3 py-1 sm:px-4 sm:py-2 mr-2 sm:mr-4 rounded-lg font-medium text-sm sm:text-base transition ${
                  activeSection === "visitor-info"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-gray-500"
                }`}
              >
                <User size={16} className="mr-1 sm:mr-2" />
                Visitor Info
              </button>
              <button
                onClick={() => setActiveSection("ratings")}
                className={`flex items-center px-3 py-1 sm:px-4 sm:py-2 mr-2 sm:mr-4 rounded-lg font-medium text-sm sm:text-base transition ${
                  activeSection === "ratings"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-gray-500"
                }`}
              >
                <Star size={16} className="mr-1 sm:mr-2" />
                Ratings
              </button>
              <button
                onClick={() => setActiveSection("feedback")}
                className={`flex items-center px-3 py-1 sm:px-4 sm:py-2 mr-2 sm:mr-4 rounded-lg font-medium text-sm sm:text-base transition ${
                  activeSection === "feedback"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-gray-500"
                }`}
              >
                <MessageSquare size={16} className="mr-1 sm:mr-2" />
                Your Comments
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-8">
              {activeSection === "visitor-info" && (
                <VisitorInfoSection
                  formData={formData}
                  handleInputChange={handleInputChange}
                  setActiveSection={setActiveSection}
                />
              )}

              {activeSection === "ratings" && (
                <RatingsSection
                  formData={formData}
                  handleStarClick={handleStarClick}
                  setActiveSection={setActiveSection}
                />
              )}

              {activeSection === "feedback" && (
                <FeedbackSection
                  formData={formData}
                  handleInputChange={handleInputChange}
                  setActiveSection={setActiveSection}
                  handleClear={handleClear}
                  handleSubmit={handleSubmit}
                  setFormData={setFormData}
                />
              )}
            </form>
          </div>
        )}

        {!formSubmitted && (
          <div className="mt-4 sm:mt-6 px-4 flex justify-center">
            <div className="flex items-center space-x-2">
              <div
                className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
                  activeSection === "visitor-info"
                    ? "bg-green-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
              <div
                className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
                  activeSection === "ratings"
                    ? "bg-green-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
              <div
                className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${
                  activeSection === "feedback"
                    ? "bg-green-500"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedpg;
