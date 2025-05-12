import { create } from "zustand";

export const useReportStore = create((set) => ({
  reports: [],
  setReports: (reports) => set({ reports }),

  createReport: async (newReport) => {
    try {
      const res = await fetch("http://localhost:5001/api/reports", {
        method: "POST",
        body: newReport,
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({ reports: [...state.reports, data.data] }));
      return { success: true, message: "Report created successfully" };
    } catch (error) {
      console.error("Error creating report:", error);
      return { success: false, message: "Error creating report" };
    }
  },

  fetchReports: async () => {
    try {
      const res = await fetch("/api/reports");
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set({ reports: data.data });
      return { success: true, message: "Reports fetched successfully" };
    } catch (error) {
      console.error("Error fetching reports:", error);
      return { success: false, message: "Error fetching reports" };
    }
  },
  
}));
