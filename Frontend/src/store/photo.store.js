import { create } from "zustand";

export const usePhotoStore = create((set, get) => ({
  photos: [],
  currentUser: null, // This would be set from your auth system

  setCurrentUser: (user) => set({ currentUser: user }),

  setPhotos: (photos) => set({ photos }),

  uploadPhoto: async (photoData) => {
    try {
      console.log("Uploading photo with data:", photoData);

      const res = await fetch("http://localhost:5001/api/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photoData),
      });

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

      // Ensure each photo has the expected structure
      const safePhotos = data.data.map((photo) => ({
        ...photo,
        likes: photo.likes || { count: 0, users: [] },
        comments: photo.comments || [],
      }));

      set({ photos: safePhotos });
      return { success: true, message: "Photos fetched successfully" };
    } catch (error) {
      console.error("Error fetching photos:", error);
      return { success: false, message: "Error fetching photos" };
    }
  },

  likePhoto: async (photoId) => {
    try {
      const { currentUser } = get();

      if (!currentUser || !currentUser.id) {
        return {
          success: false,
          message: "You must be logged in to like photos",
        };
      }

      const res = await fetch(
        `http://localhost:5001/api/photos/${photoId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser.id }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the photo in the store
      set((state) => ({
        photos: state.photos.map((photo) =>
          photo._id === photoId ? data.data : photo
        ),
      }));

      return { success: true, message: "Photo liked successfully" };
    } catch (error) {
      console.error("Error liking photo:", error);
      return { success: false, message: "Error liking photo" };
    }
  },

  unlikePhoto: async (photoId) => {
    try {
      const { currentUser } = get();

      if (!currentUser || !currentUser.id) {
        return {
          success: false,
          message: "You must be logged in to unlike photos",
        };
      }

      const res = await fetch(
        `http://localhost:5001/api/photos/${photoId}/unlike`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser.id }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the photo in the store
      set((state) => ({
        photos: state.photos.map((photo) =>
          photo._id === photoId ? data.data : photo
        ),
      }));

      return { success: true, message: "Photo unliked successfully" };
    } catch (error) {
      console.error("Error unliking photo:", error);
      return { success: false, message: "Error unliking photo" };
    }
  },

  addComment: async (photoId, text) => {
    try {
      const { currentUser } = get();

      if (!currentUser || !currentUser.id) {
        return { success: false, message: "You must be logged in to comment" };
      }

      const res = await fetch(
        `http://localhost:5001/api/photos/${photoId}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser.id,
            userName: currentUser.name,
            text,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        return { success: false, message: data.message };
      }

      // Update the photo in the store
      set((state) => ({
        photos: state.photos.map((photo) =>
          photo._id === photoId ? data.data : photo
        ),
      }));

      return { success: true, message: "Comment added successfully" };
    } catch (error) {
      console.error("Error adding comment:", error);
      return { success: false, message: "Error adding comment" };
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

  // Helper function to check if current user has liked a photo
  hasUserLikedPhoto: (photoId) => {
    const { photos, currentUser } = get();

    if (!currentUser || !currentUser.id) return false;

    const photo = photos.find((p) => p._id === photoId);
    if (!photo) return false;

    // Add safety check for likes property
    if (!photo.likes || !photo.likes.users) return false;

    return photo.likes.users.includes(currentUser.id);
  },
}));
