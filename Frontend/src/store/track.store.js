import { create } from "zustand";

export const useTrackingStore = create(() => ({
  fetchReportStatus: async (referenceNumber) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/track/status/${referenceNumber}`
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to fetch status",
      };
    }
  },
}));
