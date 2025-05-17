import { create } from "zustand"
import { auth, db } from "../../../Backend/Auth/firebase.js"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export const usePhotoStore = create((set, get) => ({
  photos: [],
  currentUser: null,
  isInitialized: false,

  // Initialize the store with Firebase Auth
  initialize: () => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, "users", user.uid))
          const userData = userDoc.exists() ? userDoc.data() : {}

          // Set the current user in the store
          set({
            currentUser: {
              id: user.uid,
              name: userData.name || user.displayName || user.email.split("@")[0],
              email: user.email,
              isLoggedIn: true,
              profileImage: userData.profileImage || user.photoURL,
            },
            isInitialized: true,
          })

          console.log("PhotoStore: User authenticated", user.uid)

          // Refresh photos when user logs in
          get().fetchPhotos()
        } catch (error) {
          console.error("Error getting user data:", error)
          // Still set basic user info even if Firestore fails
          set({
            currentUser: {
              id: user.uid,
              name: user.displayName || user.email.split("@")[0],
              email: user.email,
              isLoggedIn: true,
            },
            isInitialized: true,
          })
        }
      } else {
        // User is signed out
        set({ currentUser: null, isInitialized: true })
        console.log("PhotoStore: User signed out")
      }
    })

    // Return unsubscribe function for cleanup
    return unsubscribe
  },

  setPhotos: (photos) => set({ photos }),

  setCurrentUser: (user) => {
    console.log("PhotoStore: Setting current user manually", user)
    set({ currentUser: user })
  },

  // Check if a user has liked a photo
  hasUserLikedPhoto: (photoId) => {
    const { currentUser } = get()
    if (!currentUser) return false

    const photo = get().photos.find((p) => p._id === photoId)
    if (!photo || !photo.likes || !photo.likes.users) return false

    return photo.likes.users.includes(currentUser.id)
  },

  uploadPhoto: async (photoData) => {
    const { currentUser } = get()

    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in to upload photos",
      }
    }

    try {
      console.log("Uploading photo with data:", photoData)

      // Add user info to the photo data
      const photoWithUser = {
        ...photoData,
        userId: currentUser.id,
        userName: currentUser.name,
      }

      // Send as JSON instead of FormData
      const res = await fetch("http://localhost:5001/api/photos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(photoWithUser),
      })

      console.log("Upload response status:", res.status)

      if (!res.ok) {
        let errorMessage = "Upload failed"
        try {
          const errorData = await res.json()
          errorMessage = errorData.message || `Upload failed with status: ${res.status}`
        } catch (e) {
          errorMessage = `Upload failed with status: ${res.status}`
        }
        return { success: false, message: errorMessage }
      }

      const data = await res.json()
      console.log("Upload response data:", data)

      if (!data.success) {
        return { success: false, message: data.message }
      }

      // Refresh photos after upload
      await get().fetchPhotos()

      return {
        success: true,
        message: "Photo uploaded successfully",
        data: data.data,
      }
    } catch (error) {
      console.error("Error uploading photo:", error)
      return { success: false, message: "Error uploading photo: " + error.message }
    }
  },

  fetchPhotos: async () => {
    try {
      console.log("Fetching photos...")
      const res = await fetch("http://localhost:5001/api/photos")

      if (!res.ok) {
        return { success: false, message: `Failed to fetch photos: ${res.status}` }
      }

      const data = await res.json()
      console.log("Fetched photos:", data)

      if (!data.success) {
        return { success: false, message: data.message }
      }

      // Ensure each photo has the correct structure
      const processedPhotos = data.data.map((photo) => {
        // Create a new object to avoid modifying the original
        const processedPhoto = { ...photo }

        // Ensure likes structure
        if (!processedPhoto.likes) {
          processedPhoto.likes = { count: 0, users: [] }
        } else if (!processedPhoto.likes.users) {
          processedPhoto.likes.users = []
          processedPhoto.likes.count = 0
        } else {
          // Make sure count matches the actual number of users
          processedPhoto.likes.count = processedPhoto.likes.users.length
        }

        // Ensure comments array
        if (!processedPhoto.comments) {
          processedPhoto.comments = []
        }

        return processedPhoto
      })

      set({ photos: processedPhotos })
      return { success: true, message: "Photos fetched successfully" }
    } catch (error) {
      console.error("Error fetching photos:", error)
      return { success: false, message: "Error fetching photos: " + error.message }
    }
  },

  likePhoto: async (photoId) => {
    const { currentUser } = get()

    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in to like photos",
      }
    }

    try {
      console.log(`Liking photo ${photoId} by user ${currentUser.id}`)

      const res = await fetch(`http://localhost:5001/api/photos/${photoId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.id }),
      })

      console.log("Like response status:", res.status)

      // Try to parse the response as JSON
      let data
      try {
        data = await res.json()
        console.log("Like response data:", data)
      } catch (e) {
        console.error("Error parsing like response:", e)
        return {
          success: false,
          message: `Failed to like photo: ${res.status}`,
        }
      }

      if (!res.ok) {
        return {
          success: false,
          message: data.message || `Failed to like photo: ${res.status}`,
        }
      }

      // Update the photo in the store
      set((state) => ({
        photos: state.photos.map((photo) =>
          photo._id === photoId
            ? {
                ...photo,
                likes: data.likes || {
                  count: (photo.likes?.users?.length || 0) + 1,
                  users: [...(photo.likes?.users || []), currentUser.id],
                },
              }
            : photo,
        ),
      }))

      return { success: true }
    } catch (error) {
      console.error("Error liking photo:", error)
      return { success: false, message: "Error liking photo: " + error.message }
    }
  },

  unlikePhoto: async (photoId) => {
    const { currentUser } = get()

    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in to unlike photos",
      }
    }

    try {
      console.log(`Unliking photo ${photoId} by user ${currentUser.id}`)

      const res = await fetch(`http://localhost:5001/api/photos/${photoId}/unlike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUser.id }),
      })

      console.log("Unlike response status:", res.status)

      // Try to parse the response as JSON
      let data
      try {
        data = await res.json()
        console.log("Unlike response data:", data)
      } catch (e) {
        console.error("Error parsing unlike response:", e)
        return {
          success: false,
          message: `Failed to unlike photo: ${res.status}`,
        }
      }

      if (!res.ok) {
        return {
          success: false,
          message: data.message || `Failed to unlike photo: ${res.status}`,
        }
      }

      // Update the photo in the store
      set((state) => ({
        photos: state.photos.map((photo) =>
          photo._id === photoId
            ? {
                ...photo,
                likes: data.likes || {
                  count: Math.max((photo.likes?.users?.length || 0) - 1, 0),
                  users: (photo.likes?.users || []).filter((id) => id !== currentUser.id),
                },
              }
            : photo,
        ),
      }))

      return { success: true }
    } catch (error) {
      console.error("Error unliking photo:", error)
      return { success: false, message: "Error unliking photo: " + error.message }
    }
  },

  addComment: async (photoId, text) => {
    const { currentUser } = get()

    if (!currentUser) {
      return { success: false, message: "You must be logged in to comment" }
    }

    try {
      console.log(`Adding comment to photo ${photoId} by user ${currentUser.id}`)

      const res = await fetch(`http://localhost:5001/api/photos/${photoId}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.name,
          text,
        }),
      })

      console.log("Comment response status:", res.status)

      // Try to parse the response as JSON
      let data
      try {
        data = await res.json()
        console.log("Comment response data:", data)
      } catch (e) {
        console.error("Error parsing comment response:", e)
        return {
          success: false,
          message: `Failed to add comment: ${res.status}`,
        }
      }

      if (!res.ok) {
        return {
          success: false,
          message: data.message || `Failed to add comment: ${res.status}`,
        }
      }

      // Update the photo in the store
      set((state) => ({
        photos: state.photos.map((photo) =>
          photo._id === photoId
            ? {
                ...photo,
                comments: [
                  ...(photo.comments || []),
                  data.comment || {
                    userId: currentUser.id,
                    userName: currentUser.name,
                    text,
                    createdAt: new Date().toISOString(),
                  },
                ],
              }
            : photo,
        ),
      }))

      return { success: true }
    } catch (error) {
      console.error("Error adding comment:", error)
      return { success: false, message: "Error adding comment: " + error.message }
    }
  },

  deletePhoto: async (photoId) => {
    const { currentUser } = get()

    if (!currentUser) {
      return {
        success: false,
        message: "You must be logged in to delete photos",
      }
    }

    try {
      const res = await fetch(`http://localhost:5001/api/photos/${photoId}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        let errorMessage = "Delete failed"
        try {
          const errorData = await res.json()
          errorMessage = errorData.message || `Delete failed with status: ${res.status}`
        } catch (e) {
          errorMessage = `Delete failed with status: ${res.status}`
        }
        return { success: false, message: errorMessage }
      }

      const data = await res.json()

      if (!data.success) {
        return { success: false, message: data.message }
      }

      set((state) => ({
        photos: state.photos.filter((photo) => photo._id !== photoId),
      }))
      return { success: true, message: "Photo deleted successfully" }
    } catch (error) {
      console.error("Error deleting photo:", error)
      return { success: false, message: "Error deleting photo: " + error.message }
    }
  },
}))

