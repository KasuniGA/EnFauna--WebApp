import { ref, set, push, remove, get, query, orderByChild } from "firebase/database"
import { rtdb } from "../../../Backend/Auth/firebase.js"

/**
 * Utility functions for Firebase Realtime Database interactions
 */

// Save a like to a photo
export const saveLike = async (photoId, userId, userName) => {
  try {
    const likeRef = ref(rtdb, `photoInteractions/${photoId}/likes/${userId}`)
    await set(likeRef, {
      userId,
      userName,
      timestamp: Date.now(),
    })
    return { success: true }
  } catch (error) {
    console.error("Error saving like:", error)
    return { success: false, error }
  }
}

// Remove a like from a photo
export const removeLike = async (photoId, userId) => {
  try {
    const likeRef = ref(rtdb, `photoInteractions/${photoId}/likes/${userId}`)
    await remove(likeRef)
    return { success: true }
  } catch (error) {
    console.error("Error removing like:", error)
    return { success: false, error }
  }
}

// Add a comment to a photo
export const addComment = async (photoId, userId, userName, text) => {
  try {
    const commentsRef = ref(rtdb, `photoInteractions/${photoId}/comments`)
    const newCommentRef = push(commentsRef)
    await set(newCommentRef, {
      userId,
      userName,
      text,
      createdAt: new Date().toISOString(),
      timestamp: Date.now(),
    })
    return { success: true, commentId: newCommentRef.key }
  } catch (error) {
    console.error("Error adding comment:", error)
    return { success: false, error }
  }
}

// Delete a comment from a photo
export const deleteComment = async (photoId, commentId) => {
  try {
    const commentRef = ref(rtdb, `photoInteractions/${photoId}/comments/${commentId}`)
    await remove(commentRef)
    return { success: true }
  } catch (error) {
    console.error("Error deleting comment:", error)
    return { success: false, error }
  }
}

// Get all likes for a photo
export const getPhotoLikes = async (photoId) => {
  try {
    const likesRef = ref(rtdb, `photoInteractions/${photoId}/likes`)
    const snapshot = await get(likesRef)
    const likes = snapshot.val() || {}
    return {
      success: true,
      likes: Object.entries(likes).map(([userId, data]) => ({
        userId,
        ...data,
      })),
    }
  } catch (error) {
    console.error("Error getting photo likes:", error)
    return { success: false, error }
  }
}

// Get all comments for a photo
export const getPhotoComments = async (photoId) => {
  try {
    // Query comments ordered by timestamp
    const commentsRef = query(ref(rtdb, `photoInteractions/${photoId}/comments`), orderByChild("timestamp"))
    const snapshot = await get(commentsRef)
    const comments = snapshot.val() || {}
    return {
      success: true,
      comments: Object.entries(comments).map(([commentId, data]) => ({
        id: commentId,
        ...data,
      })),
    }
  } catch (error) {
    console.error("Error getting photo comments:", error)
    return { success: false, error }
  }
}

// Check if a user has liked a photo
export const hasUserLikedPhoto = async (photoId, userId) => {
  try {
    const likeRef = ref(rtdb, `photoInteractions/${photoId}/likes/${userId}`)
    const snapshot = await get(likeRef)
    return { success: true, hasLiked: snapshot.exists() }
  } catch (error) {
    console.error("Error checking if user liked photo:", error)
    return { success: false, error }
  }
}

// Get interaction stats for a photo
export const getPhotoStats = async (photoId) => {
  try {
    // Get likes count
    const likesRef = ref(rtdb, `photoInteractions/${photoId}/likes`)
    const likesSnapshot = await get(likesRef)
    const likes = likesSnapshot.val() || {}
    const likeCount = Object.keys(likes).length

    // Get comments count
    const commentsRef = ref(rtdb, `photoInteractions/${photoId}/comments`)
    const commentsSnapshot = await get(commentsRef)
    const comments = commentsSnapshot.val() || {}
    const commentCount = Object.keys(comments).length

    return {
      success: true,
      stats: {
        likes: likeCount,
        comments: commentCount,
      },
    }
  } catch (error) {
    console.error("Error getting photo stats:", error)
    return { success: false, error }
  }
}

// Initialize interactions for a new photo
export const initializePhotoInteractions = async (photoId, initialData = {}) => {
  try {
    const photoRef = ref(rtdb, `photoInteractions/${photoId}`)
    await set(photoRef, {
      likes: initialData.likes || {},
      comments: initialData.comments || {},
      createdAt: Date.now(),
    })
    return { success: true }
  } catch (error) {
    console.error("Error initializing photo interactions:", error)
    return { success: false, error }
  }
}

// Delete all interactions for a photo
export const deletePhotoInteractions = async (photoId) => {
  try {
    const photoRef = ref(rtdb, `photoInteractions/${photoId}`)
    await remove(photoRef)
    return { success: true }
  } catch (error) {
    console.error("Error deleting photo interactions:", error)
    return { success: false, error }
  }
}
