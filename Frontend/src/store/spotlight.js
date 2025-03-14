import { create } from "zustand";

export const useSpotlightStore = create((set) => ({
  spotlights: [],
  setSpotlights: (spotlights) => set({ spotlights }),
  createSpotlight: async (newSpotlight) => {
    if (
      !newSpotlight.name ||
      !newSpotlight.habitat ||
      !newSpotlight.population ||
      !newSpotlight.threats ||
      !newSpotlight.efforts ||
      !newSpotlight.programs ||
      !newSpotlight.image
    ) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/spotlights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSpotlight),
    });
    const data = await res.json();
    set((state) => ({ spotlights: [...state.spotlights, data.data] }));
    return { success: true, message: "spotlights created successfully" };
  },
  fetchSpotlight: async () => {
    const res = await fetch("/api/spotlights");
    const data = await res.json();
    set({ spotlights: data.data });
  },
  deleteSpotlight: async (sid) => {
    const res = await fetch(`/api/spotlights/${sid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    // update the ui immediately, without needing a refresh
    set((state) => ({
      spotlights: state.spotlights.filter((spotlight) => spotlight._id !== sid),
    }));
    return { success: true, message: data.message };
  },

  updateSpotlight: async (sid, updatedSpotlight) => {
    try {
      const res = await fetch(`/api/spotlights/${sid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSpotlight),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the state with the new spotlight data
      set((state) => ({
        spotlights: state.spotlights.map((spotlight) =>
          spotlight._id === sid
            ? { ...spotlight, ...updatedSpotlight }
            : spotlight
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: "Error updating spotlight" };
    }
  },
}));
