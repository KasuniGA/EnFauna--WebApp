"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, Send } from "lucide-react"
import { usePhotoStore } from "../store/photo.store.js"
import Toast from "../Components/Toast.jsx"

const PhotoCard = ({ photo }) => {
  const [comment, setComment] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", description: "" })

  // Ensure photo has the expected structure with defaults
  const safePhoto = {
    ...photo,
    likes: photo.likes || { count: 0, users: [] },
    comments: photo.comments || [],
  }

  const { currentUser, likePhoto, unlikePhoto, addComment, hasUserLikedPhoto } = usePhotoStore()

  // Use the safe photo object for checking likes
  const isLiked = hasUserLikedPhoto ? hasUserLikedPhoto(safePhoto._id) : false

  const handleLikeToggle = async () => {
    if (!currentUser) {
      showToastMessage("Authentication Required", "Please log in to like photos")
      return
    }

    const result = isLiked ? await unlikePhoto(safePhoto._id) : await likePhoto(safePhoto._id)

    if (!result.success) {
      showToastMessage("Error", result.message)
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    if (!comment.trim()) return

    if (!currentUser) {
      showToastMessage("Authentication Required", "Please log in to comment")
      return
    }

    const result = await addComment(safePhoto._id, comment.trim())

    if (result.success) {
      setComment("")
      showToastMessage("Success", "Comment added successfully")
    } else {
      showToastMessage("Error", result.message)
    }
  }

  const showToastMessage = (title, description) => {
    setToastMessage({ title, description })
    setShowToast(true)
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={safePhoto.imageUrl || "/placeholder.svg?height=300&width=400"}
          alt={safePhoto.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-300">{safePhoto.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By {safePhoto.name} • {formatDate(safePhoto.createdAt || new Date())}
            </p>
          </div>
          <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 rounded-full">
            <span className="text-xs font-medium text-emerald-800 dark:text-emerald-200">{safePhoto.species}</span>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-3">{safePhoto.description || "No description provided."}</p>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
          <span className="mr-2">📍</span>
          <span>{safePhoto.location}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-2 mb-3">
          <button
            onClick={handleLikeToggle}
            className="flex items-center gap-1 transition-colors hover:text-emerald-500 dark:hover:text-emerald-400"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-400"}`}
            />
            <span className={`text-sm ${isLiked ? "text-red-500" : "text-gray-600 dark:text-gray-400"}`}>
              {safePhoto.likes.count}
            </span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{safePhoto.comments.length}</span>
          </button>

          <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400">
            <Share className="w-5 h-5" />
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Comments</h4>

            {safePhoto.comments.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {safePhoto.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm text-emerald-600 dark:text-emerald-300">
                        {comment.userName}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
            )}

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="p-2 bg-emerald-500 text-white rounded-lg disabled:opacity-50 hover:bg-emerald-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Toast */}
      <Toast
        isVisible={showToast}
        message={toastMessage.title}
        description={toastMessage.description}
        onClose={() => setShowToast(false)}
      />
    </div>
  )
}

export default PhotoCard
