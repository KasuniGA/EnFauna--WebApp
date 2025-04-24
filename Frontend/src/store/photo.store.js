import { create } from "zustand";

export const usePhotoStore = create((set) => ({
  photos: [],
  setPhotos: (photos) => set({ photos }),

  uploadPhoto: async (photoData) => {
    try {
      console.log("Uploading photo with data:", photoData);

      // Send as JSON instead of FormData
      const res = await fetch("http://localhost:5001/api/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photoData),
      });

      // Log response status for debugging
      console.log("Upload response status:", res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server error response:", errorText);
        throw new Error(`Upload failed with status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Upload response data:", data);

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({ photos: [data.data, ...state.photos] }));
      return {
        success: true,
        message: "Photo uploaded successfully",
        data: data.data,
      };
    } catch (error) {
      console.error("Error uploading photo:", error);
      return { success: false, message: "Error uploading photo" };
    }
  },

  fetchPhotos: async () => {
    try {
      const res = await fetch("http://localhost:5001/api/photos");
      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set({ photos: data.data });
      return { success: true, message: "Photos fetched successfully" };
    } catch (error) {
      console.error("Error fetching photos:", error);
      return { success: false, message: "Error fetching photos" };
    }
  },

  deletePhoto: async (photoId) => {
    try {
      const res = await fetch(`http://localhost:5001/api/photos/${photoId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        photos: state.photos.filter((photo) => photo._id !== photoId),
      }));
      return { success: true, message: "Photo deleted successfully" };
    } catch (error) {
      console.error("Error deleting photo:", error);
      return { success: false, message: "Error deleting photo" };
    }
  },
}));
