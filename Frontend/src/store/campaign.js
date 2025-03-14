import { create } from "zustand";

export const useCampaignStore = create((set) => ({
  campaigns: [],
  setCampaigns: (campaigns) => set({ campaigns }),
  createCampaign: async (newCampaign) => {
    if (
      !newCampaign.name ||
      !newCampaign.raised ||
      !newCampaign.description ||
      !newCampaign.goal ||
      !newCampaign.image
    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCampaign),
    });
    const data = await res.json();
    set((state) => ({ campaigns: [...state.campaigns, data.data] }));
    return { success: true, message: "Campaign created successfully" };
  },
  fetchCampaigns: async () => {
    const res = await fetch("/api/campaigns");
    const data = await res.json();
    set({ campaigns: data.data });
  },
  deleteCampaign: async (pid) => {
    const res = await fetch(`/api/campaigns/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      campaigns: state.campaigns.filter((campaign) => campaign._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateCampaign: async (pid, updatedCampaign) => {
    try {
      const res = await fetch(`/api/campaigns/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCampaign),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the state with the new campaign data
      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign._id === pid ? { ...campaign, ...updatedCampaign } : campaign
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Error updating campaign" };
    }
  },
}));
