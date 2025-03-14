import { create } from "zustand";

export const useReportStore = create((set) => ({
  reports: [], // Array to store all reports
  setReports: (reports) => set({ reports }), // Function to set reports

  // Function to create a new report
  createReport: async (newReport) => {
    console.log(newReport.get("date"));
    // Validate required fields
    if (
      !newReport.get("incidentType") ||
      !newReport.get("description") ||
      !newReport.get("date") ||
      !newReport.get("time") ||
      !newReport.get("longitude") ||
      !newReport.get("latitude")
    ) {
      return { success: false, message: "Please fill in all required fields." };
    }

    try {
      // Send a POST request to create a new report
      const res = await fetch("http://localhost:5001/api/reports", {
        method: "POST",
        body: newReport,
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the state with the new report
      set((state) => ({ reports: [...state.reports, data.data] }));

      return { success: true, message: "Report created successfully" };
    } catch (error) {
      console.error("Error creating report:", error);
      return { success: false, message: "Error creating report" };
    }
  },

  // Function to fetch all reports
  fetchReports: async () => {
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the state with the fetched reports
      set({ reports: data.data });
      return { success: true, message: "Reports fetched successfully" };
    } catch (error) {
      console.error("Error fetching reports:", error);
      return { success: false, message: "Error fetching reports" };
    }
  },
}));
