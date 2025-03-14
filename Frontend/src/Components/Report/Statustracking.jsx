import React, { useState } from "react";
import { CheckCircle, Clock } from "lucide-react";

// Sample reported incidents data
const reportedIncidents = [
  {
    id: "INC-001",
    type: "Wildlife Sightings",
    date: "2024-12-20",
    status: "Under Review",
    feedback: "Our rangers are investigating the reported location.",
  },
  {
    id: "INC-002",
    type: "Habitat Destruction",
    date: "2024-12-21",
    status: "Action Taken",
    feedback:
      "Local authorities have been notified and are taking necessary steps.",
  },
];

function StatusTracking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  return (
    <div className=" mx-auto relative opacity-95 z-10">
      {isSubmitting && <LoadingSpinner />}
      {showSubmissionMessage && <SuccessMessage />}
      {showStatusModal && <StatusModal onClose={() => setShowStatusModal(false)} />}

      <button
        type="button"
        onClick={() => setShowStatusModal(true)}
        className="w-full mt-4 bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-900 flex items-center justify-center transition duration-200 ease-in-out"
      >
        <Clock className="h-5 w-5 mr-2" />
        Track Incident Status
      </button>
    </div>
  );
}

// ✅ Move StatusModal outside for better performance
const StatusModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className=" bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold dark:text-white">Incident Status Tracking</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {reportedIncidents.map((incident) => (
          <div key={incident.id} className="border dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold dark:text-white">{incident.type}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">ID: {incident.id}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  incident.status === "Under Review"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                }`}
              >
                {incident.status}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Date: {incident.date}</p>
            <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <p className="text-sm dark:text-gray-300">{incident.feedback}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ✅ Move LoadingSpinner outside
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
  </div>
);

// ✅ Move SuccessMessage outside
const SuccessMessage = () => (
  <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 flex items-center shadow-lg">
    <CheckCircle className="h-5 w-5 mr-2" />
    <div>
      <p className="font-bold">Thank you for your report!</p>
      <p className="text-sm">
        We will review it promptly. You can track its status on your dashboard.
      </p>
    </div>
  </div>
);

export default StatusTracking;
