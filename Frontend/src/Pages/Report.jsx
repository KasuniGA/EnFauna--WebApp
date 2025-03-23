import React, { useState, useEffect } from "react";
import { Camera, Upload, AlertCircle, UserCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import GMap from "../Components/Report/GMap";
import { useReportStore } from "../store/report.store";
import Statustracking from "../Components/Report/Statustracking";
import Toast from "../Components/Toast";

const IncidentReportForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    title: "",
    description: "",
  });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [formData, setFormData] = useState({
    uploadedPhotos: [],
    uploadedVideos: [],
  });

  const { createReport } = useReportStore();

  const showToastMessage = (title, description) => {
    setToastMessage({ title, description });
    setShowToast(true);
  };

  const handleFileUpload = async (event, type) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const isImage = type === "uploadedPhotos";
    const uploadPreset = isImage ? "images_presets" : "videos_presets";
    const cloudinaryURL = `https://api.cloudinary.com/v1_1/dqyone0du/${
      isImage ? "image" : "video"
    }/upload`;

    const updatedFiles = await Promise.all(
      files.map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", uploadPreset);

        try {
          const res = await fetch(cloudinaryURL, {
            method: "POST",
            body: data,
          });

          const result = await res.json();
          return result.secure_url; // Return the uploaded file URL
        } catch (error) {
          console.error("Upload failed:", error);
          return null;
        }
      })
    );

    setFormData((prevState) => ({
      ...prevState,
      [type]: [...prevState[type], ...updatedFiles.filter((url) => url)],
    }));
  };

  const handleLocationUpdate = (lat, lng) => {
    setLocation({ latitude: lat, longitude: lng });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reportData = {
      incidentType: e.target.elements["incident-type"].value,
      description: e.target.elements["description"].value,
      date: e.target.elements["date"].value,
      time: e.target.elements["time"].value,
      priority: e.target.elements["priority"].value,
      isAnonymous: isAnonymous,
      longitude: location.longitude,
      latitude: location.latitude,
    };

    // Add personal information if not anonymous
    if (!isAnonymous) {
      reportData.name = e.target.elements["name"].value;
      reportData.contact = e.target.elements["contact"].value;
    }

    // Validate required fields
    if (
      !reportData.incidentType ||
      !reportData.description ||
      !reportData.date ||
      !reportData.time ||
      !location.longitude ||
      !location.latitude
    ) {
      showToastMessage(
        "Missing Fields",
        "Please fill in all required fields and select a location on the map."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Create FormData instance for file uploads
      const formDataToSend = new FormData();

      // Append all report data
      Object.keys(reportData).forEach((key) => {
        formDataToSend.append(key, reportData[key]);
      });

      // Append photos
      formData.uploadedPhotos.forEach((photo, index) => {
        formDataToSend.append(`photos[${index}]`, photo);
      });

      // Append videos
      formData.uploadedVideos.forEach((video, index) => {
        formDataToSend.append(`videos[${index}]`, video);
      });

      // Send the report data to the backend
      const response = await createReport(formDataToSend);

      if (response.success) {
        showToastMessage(
          "Report Submitted",
          "Your incident report has been received."
        );

        // Reset form
        e.target.reset();
        setFormData({ uploadedPhotos: [], uploadedVideos: [] });
        setLocation({ latitude: null, longitude: null });

        // Show submission message for 5 seconds
        setShowSubmissionMessage(true);
        setTimeout(() => {
          setShowSubmissionMessage(false);
        }, 5000);
      } else {
        showToastMessage(
          "Error",
          response.message || "Failed to submit report."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      showToastMessage("Error", "Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen dark:opacity-80 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 pt-28 pb-16 bg-cover bg-no-repeat bg-blend-overlay"
      style={{ backgroundImage: "url('src/assets/4.jpg')" }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-lg bg-opacity-95">
        {/* Header Section */}
        <div className="relative p-8 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="absolute right-4 top-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-text"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="M10 9H8" />
              <path d="M16 13H8" />
              <path d="M16 17H8" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold mb-2">Report an Incident</h1>
          <p className="text-green-100 max-w-2xl">
            Help us protect wildlife by reporting incidents accurately. Your
            reports can make a difference in preserving endangered species and
            their habitats.
          </p>
        </div>

        {/* Alert Banner */}
        <button
          onClick={() => (window.location.href = "/contact")}
          className="w-full -mx-0 -mt-4 relative"
        >
          <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/50 text-red-700 dark:text-red-200 border border-red-200 dark:border-red-800 rounded-lg shadow-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span className="font-medium">Critical Incident Alert</span>
            </div>
            <span>Contact Park Rangers Immediately!</span>
          </div>
        </button>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Anonymous Submission Toggle */}
            <div className="flex items-center space-x-2 mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Submit Anonymously
                </span>
              </label>
            </div>

            {/* Personal Information - Conditional Rendering */}
            {!isAnonymous && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold dark:text-white text-gray-900">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium dark:text-gray-300 text-gray-900"
                    >
                      Name <span className="text-orange-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium dark:text-gray-300 text-gray-900"
                    >
                      Contact Number <span className="text-orange-400">*</span>
                    </label>
                    <input
                      id="contact"
                      type="tel"
                      required
                      className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+94 XX XXX XXXX"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Incident Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold dark:text-white text-gray-900">
                Incident Details
              </h3>
              <div className="space-y-2">
                <label
                  htmlFor="incident-type"
                  className="block text-sm font-medium dark:text-gray-300 text-gray-900"
                >
                  Incident Type <span className="text-orange-400">*</span>
                </label>
                <select
                  id="incident-type"
                  name="incident-type"
                  required
                  className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select incident type</option>
                  <option value="wildlife">Wildlife Sightings</option>
                  <option value="poaching">Poaching Activities</option>
                  <option value="habitat">Habitat Destruction</option>
                  <option value="injured">Injured Animals</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium dark:text-gray-300 text-gray-900"
                >
                  Description <span className="text-orange-400">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  name="description"
                  className="w-full px-3 py-2 border rounded-md h-32 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Explain what you observed..."
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Maximum 300 words
                </p>
              </div>
            </div>

            {/* Location and Timing */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold dark:text-white text-gray-900">
                Location & Timing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium dark:text-gray-300 text-gray-900"
                  >
                    Location <span className="text-orange-400">*</span>
                  </label>
                  <div className="flex space-x-2 items-center">
                    <GMap onLocationUpdate={handleLocationUpdate} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-900">
                    Date & Time
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      name="date"
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                    <input
                      type="time"
                      name="time"
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold dark:text-white text-gray-900">
                Visual Documentation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-900">
                    Photos
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera className="h-8 w-8 mb-2 dark:text-gray-300 text-gray-900" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Upload photos (JPG, PNG)
                        </p>
                      </div>
                      <input
                        type="file"
                        name="uploadedPhotos"
                        className="w-full p-2 border rounded border-gray-100 dark:border-gray-700 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                        id="photoUpload"
                        onChange={(e) => handleFileUpload(e, "uploadedPhotos")}
                        accept="image/*"
                        multiple
                      />
                    </label>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-900">
                    Videos
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-8 w-8 mb-2 dark:text-gray-300 text-gray-900" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Upload videos (MP4, MOV)
                        </p>
                      </div>
                      <input
                        type="file"
                        name="uploadedVideos"
                        className="w-full p-2 border rounded border-gray-100 dark:border-gray-700 mt-1 bg-transparent dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                        id="videosUpload"
                        onChange={(e) => handleFileUpload(e, "uploadedVideos")}
                        accept="video/*"
                        multiple
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium dark:text-gray-300 text-gray-900"
                >
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <Toast
              isVisible={showToast}
              message={toastMessage.title}
              description={toastMessage.description}
              onClose={() => setShowToast(false)}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 hover:text-green-100 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isAnonymous && <UserCircle2 className="h-5 w-5 mr-2" />}
              {isSubmitting
                ? "Submitting..."
                : `Submit ${isAnonymous ? "Anonymous" : ""} Report`}
            </button>
          </form>
        </div>

        <div className="p-6">
          <div className="">
            <Statustracking />
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/help"
              className="text-cyan-800 hover:text-blue-800 dark:text-cyan-500 dark:hover:text-blue-300"
            >
              Need help? Visit our Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportForm;
