import { useState, useEffect } from "react"
import { Heart, MessageCircle, Share, Send } from "lucide-react"
import { usePhotoStore } from "../store/photo.store.js"
import Toast from "../Components/Toast.jsx"
import { useNavigate } from "react-router-dom"
import { auth } from "../../../Backend/Auth/firebase.js"

const PhotoCard = ({ photo }) => {
  const navigate = useNavigate()
  const [comment, setComment] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState({ title: "", description: "" })
  const [localLikes, setLocalLikes] = useState({ count: 0, users: [] })
  const [localComments, setLocalComments] = useState([])
  const [isLiked, setIsLiked] = useState(false)

  const { currentUser, likePhoto, unlikePhoto, addComment } = usePhotoStore()

  // Ensure photo has the expected structure with defaults
  const safePhoto = {
    ...photo,
    likes: photo.likes || { count: 0, users: [] },
    comments: photo.comments || [],
  }

  // Initialize local state from props
  useEffect(() => {
    // Make sure we're using the correct count
    const likesCount = safePhoto.likes.users ? safePhoto.likes.users.length : safePhoto.likes.count || 0
    const usersArray = safePhoto.likes.users || []

    setLocalLikes({
      count: likesCount,
      users: usersArray,
    })

    setLocalComments(safePhoto.comments)

    // Check if current user has liked this photo
    if (currentUser && usersArray.includes(currentUser.id)) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }

    console.log(`PhotoCard: Initialized with ${likesCount} likes and ${safePhoto.comments.length} comments`)
  }, [safePhoto._id, safePhoto.likes, safePhoto.comments, currentUser])

  const handleLikeToggle = async () => {
    // Check if user is authenticated with Firebase
    if (!auth.currentUser) {
      showToastMessage("Authentication Required", "Please log in to like photos")
      return
    }

    // Update local state immediately for better UX
    if (isLiked) {
      setLocalLikes((prev) => ({
        count: Math.max((prev.count || 0) - 1, 0),
        users: (prev.users || []).filter((id) => id !== currentUser?.id),
      }))
      setIsLiked(false)
    } else {
      setLocalLikes((prev) => ({
        count: (prev.count || 0) + 1,
        users: [...(prev.users || []), currentUser?.id],
      }))
      setIsLiked(true)
    }

    // Call API
    try {
      const result = isLiked ? await unlikePhoto(safePhoto._id) : await likePhoto(safePhoto._id)

      if (!result.success) {
        // Revert local state if API call fails
        if (isLiked) {
          setLocalLikes((prev) => ({
            count: (prev.count || 0) + 1,
            users: [...(prev.users || []), currentUser?.id],
          }))
          setIsLiked(true)
        } else {
          setLocalLikes((prev) => ({
            count: Math.max((prev.count || 0) - 1, 0),
            users: (prev.users || []).filter((id) => id !== currentUser?.id),
          }))
          setIsLiked(false)
        }
        showToastMessage("Error", result.message)
      }
    } catch (error) {
      console.error("Error toggling like:", error)
      showToastMessage("Error", "Failed to update like status")

      // Revert local state on error
      if (isLiked) {
        setLocalLikes((prev) => ({
          count: (prev.count || 0) + 1,
          users: [...(prev.users || []), currentUser?.id],
        }))
        setIsLiked(true)
      } else {
        setLocalLikes((prev) => ({
          count: Math.max((prev.count || 0) - 1, 0),
          users: (prev.users || []).filter((id) => id !== currentUser?.id),
        }))
        setIsLiked(false)
      }
    }
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()

    if (!comment.trim()) return

    // Check if user is authenticated with Firebase
    if (!auth.currentUser) {
      showToastMessage("Authentication Required", "Please log in to comment")
      return
    }

    // Add comment to local state immediately for better UX
    const newComment = {
      userId: currentUser?.id,
      userName: currentUser?.name,
      text: comment.trim(),
      createdAt: new Date().toISOString(),
    }
    setLocalComments((prev) => [...prev, newComment])
    setComment("")

    // Call API
    try {
      const result = await addComment(safePhoto._id, comment.trim())

      if (!result.success) {
        // Remove the comment if API call fails
        setLocalComments((prev) => prev.filter((c) => c !== newComment))
        showToastMessage("Error", result.message)
      } else {
        showToastMessage("Success", "Comment added successfully")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
      // Remove the comment if API call fails
      setLocalComments((prev) => prev.filter((c) => c !== newComment))
      showToastMessage("Error", "Failed to add comment")
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
              {localLikes.count}
            </span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">{localComments.length}</span>
          </button>

          <button className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400">
            <Share className="w-5 h-5" />
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">Comments</h4>

            {localComments.length > 0 ? (
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {localComments.map((comment, index) => (
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
