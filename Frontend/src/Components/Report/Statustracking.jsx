import React, { useState } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { useTrackingStore } from "../../store/track.store.js";

const StatusTracking = () => {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [report, setReport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showStatusModal, setShowStatusModal] = useState(false);

  const { fetchReportStatus } = useTrackingStore();

  const handleSearch = async () => {
    if (!referenceNumber.trim()) {
      setError("Please enter a reference number");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetchReportStatus(referenceNumber);

      if (response.success) {
        setReport({
          referenceNumber: response.data.referenceNumber,
          status: response.data.status,
          feedback: response.data.feedback,
        });
        setShowStatusModal(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("Failed to fetch report status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto relative opacity-95 z-10">
      <div className="mb-4">
        <h3 className="text-lg font-medium dark:text-white mb-2">
          Track Your Report Status
        </h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              placeholder="Enter your reference number"
              className="w-full pl-10 pr-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-cyan-700 text-white py-2 px-4 rounded-md hover:bg-cyan-900 flex items-center justify-center transition duration-200 ease-in-out disabled:opacity-50"
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1" />
            {error}
          </p>
        )}
      </div>

      {showStatusModal && report && (
        <StatusModal
          report={report}
          onClose={() => setShowStatusModal(false)}
        />
      )}
    </div>
  );
};

const StatusModal = ({ report, onClose }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "under_review":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatIncidentType = (type) => {
    const typeMap = {
      wildlife: "Wildlife Sighting",
      poaching: "Poaching Activity",
      habitat: "Habitat Destruction",
      injured: "Injured Animal",
      other: "Other Incident",
    };
    return typeMap[type] || type;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            Report Status: {report.referenceNumber}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="border dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold dark:text-white">
                  {formatIncidentType(report.incidentType)}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Reported on: {formatDate(report.createdAt)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                  report.status
                )}`}
              >
                {report.status.replace("_", " ")}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Description
                </p>
                <p className="text-sm dark:text-gray-200 whitespace-pre-line">
                  {report.description}
                </p>
              </div>

              {report.feedback && (
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Feedback from Admin
                  </p>
                  <p className="text-sm dark:text-gray-200">
                    {report.feedback}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Priority
                  </p>
                  <p className="text-sm capitalize dark:text-gray-200">
                    {report.priority}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    Location
                  </p>
                  <p className="text-sm dark:text-gray-200">
                    {report.location?.coordinates?.[1]?.toFixed(4)},{" "}
                    {report.location?.coordinates?.[0]?.toFixed(4)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusTracking;
