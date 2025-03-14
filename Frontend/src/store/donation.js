import { create } from "zustand";

export const useDonationStore = create((set) => ({
  donations: [],
  setDonations: (donations) => set({ donations }),
  createDonation: async (newDonation) => {
    if (
      !newDonation.name ||
      !newDonation.type ||
      !newDonation.description ||
      !newDonation.amount ||
      !newDonation.image
    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDonation),
    });
    const data = await res.json();
    set((state) => ({ donations: [...state.donations, data.data] }));
    return { success: true, message: "Donation created successfully" };
  },
  fetchDonations: async () => {
    const res = await fetch("/api/donations");
    const data = await res.json();
    set({ donations: data.data });
  },
  deleteDonation: async (pid) => {
    const res = await fetch(`/api/donations/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      donations: state.donations.filter((donation) => donation._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateDonation: async (pid, updatedDonation) => {
    try {
      const res = await fetch(`/api/donations/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDonation),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the state with the new donation data
      set((state) => ({
        donations: state.donations.map((donation) =>
          donation._id === pid ? { ...donation, ...updatedDonation } : donation
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Error updating donation" };
    }
  },
}));
