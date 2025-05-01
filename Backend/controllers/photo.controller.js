import Photo from "../models/photo.model.js"

// Get all photos
export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: photos.length,
      data: photos,
    })
  } catch (error) {
    console.error("Error fetching photos:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while fetching photos",
    })
  }
}

// Get a single photo
export const getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id)

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      })
    }

    return res.status(200).json({
      success: true,
      data: photo,
    })
  } catch (error) {
    console.error("Error fetching photo:", error)

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid photo ID",
      })
    }

    return res.status(500).json({
      success: false,
      message: "Server error while fetching photo",
    })
  }
}

// Create a new photo
export const createPhoto = async (req, res) => {
  try {
    // Extract photo data from request body
    const { name, title, description, species, location, imageUrl } = req.body

    // Validate required fields
    if (!name || !title || !species || !location || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      })
    }

    // Create new photo
    const photo = await Photo.create({
      name,
      title,
      description,
      species,
      location,
      imageUrl,
      likes: { count: 0, users: [] },
      comments: [],
    })

    return res.status(201).json({
      success: true,
      message: "Photo uploaded successfully",
      data: photo,
    })
  } catch (error) {
    console.error("Error creating photo:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while creating photo",
    })
  }
}

// Like a photo
export const likePhoto = async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      })
    }

    const photo = await Photo.findById(req.params.id)

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      })
    }

    // Check if user already liked the photo
    if (photo.likes.users.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already liked this photo",
      })
    }

    // Add user to likes and increment count
    photo.likes.users.push(userId)
    photo.likes.count = photo.likes.users.length

    await photo.save()

    return res.status(200).json({
      success: true,
      message: "Photo liked successfully",
      data: photo,
    })
  } catch (error) {
    console.error("Error liking photo:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while liking photo",
    })
  }
}

// Unlike a photo
export const unlikePhoto = async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      })
    }

    const photo = await Photo.findById(req.params.id)

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      })
    }

    // Check if user has liked the photo
    if (!photo.likes.users.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have not liked this photo",
      })
    }

    // Remove user from likes and decrement count
    photo.likes.users = photo.likes.users.filter((id) => id !== userId)
    photo.likes.count = photo.likes.users.length

    await photo.save()

    return res.status(200).json({
      success: true,
      message: "Photo unliked successfully",
      data: photo,
    })
  } catch (error) {
    console.error("Error unliking photo:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while unliking photo",
    })
  }
}

// Add a comment to a photo
export const addComment = async (req, res) => {
  try {
    const { userId, userName, text } = req.body

    if (!userId || !userName || !text) {
      return res.status(400).json({
        success: false,
        message: "User ID, name, and comment text are required",
      })
    }

    const photo = await Photo.findById(req.params.id)

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      })
    }

    // Add comment
    photo.comments.push({
      userId,
      userName,
      text,
      createdAt: new Date(),
    })

    await photo.save()

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      data: photo,
    })
  } catch (error) {
    console.error("Error adding comment:", error)
    return res.status(500).json({
      success: false,
      message: "Server error while adding comment",
    })
  }
}

// Delete a photo
export const deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id)

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      })
    }

    await photo.deleteOne()

    return res.status(200).json({
      success: true,
      message: "Photo deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting photo:", error)

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid photo ID",
      })
    }

    return res.status(500).json({
      success: false,
      message: "Server error while deleting photo",
    })
  }
}
