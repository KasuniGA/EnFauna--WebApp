import { create } from "zustand";

export const useFeedbackStore = create((set) => ({
  feedbacks: [],
  setFeedbacks: (feedbacks) => set({ feedbacks }),

  submitFeedback: async (newFeedback) => {
    if (
      !newFeedback.visitDate ||
      !newFeedback.visitReason ||
      !newFeedback.visitCompanions
    ) {
      return { success: false, message: "Please fill in all required fields." };
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };

      set((state) => ({ feedbacks: [...state.feedbacks, data.data] }));
      return { success: true, message: "Feedback submitted successfully" };
    } catch (error) {
      return { success: false, message: "Error submitting feedback" };
    }
  },

  fetchFeedbacks: async () => {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      set({ feedbacks: data.data });
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  },

  deleteFeedback: async (fid) => {
    try {
      const res = await fetch(`/api/feedback/${fid}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        feedbacks: state.feedbacks.filter((feedback) => feedback._id !== fid),
      }));
      return { success: true, message: "Feedback deleted successfully" };
    } catch (error) {
      return { success: false, message: "Error deleting feedback" };
    }
  },

  updateFeedback: async (fid, updatedFeedback) => {
    try {
      const res = await fetch(`/api/feedback/${fid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFeedback),
      });
      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        feedbacks: state.feedbacks.map((feedback) =>
          feedback._id === fid ? { ...feedback, ...updatedFeedback } : feedback
        ),
      }));
      return { success: true, message: "Feedback updated successfully" };
    } catch (error) {
      return { success: false, message: "Error updating feedback" };
    }
  },
}));
