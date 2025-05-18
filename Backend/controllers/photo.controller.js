

import Photo from "../models/photo.model.js";

// Get all photos
export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });

    // Ensure likes and comments are properly initialized for each photo
    const processedPhotos = photos.map((photo) => {
      const photoObj = photo.toObject();

      // Ensure likes structure
      if (!photoObj.likes) {
        photoObj.likes = { count: 0, users: [] };
      } else if (!photoObj.likes.users) {
        photoObj.likes.users = [];
        photoObj.likes.count = 0;
      } else {
        // Make sure count matches the actual number of users
        photoObj.likes.count = photoObj.likes.users.length;
      }

      // Ensure comments array
      if (!photoObj.comments) {
        photoObj.comments = [];
      }

      return photoObj;
    });

    return res.status(200).json({
      success: true,
      count: processedPhotos.length,
      data: processedPhotos,
    });
  } catch (error) {
    console.error("Error fetching photos:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching photos",
    });
  }
};

// Get a single photo
export const getPhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    // Ensure likes and comments are properly initialized
    const photoObj = photo.toObject();

    // Ensure likes structure
    if (!photoObj.likes) {
      photoObj.likes = { count: 0, users: [] };
    } else if (!photoObj.likes.users) {
      photoObj.likes.users = [];
      photoObj.likes.count = 0;
    } else {
      // Make sure count matches the actual number of users
      photoObj.likes.count = photoObj.likes.users.length;
    }

    // Ensure comments array
    if (!photoObj.comments) {
      photoObj.comments = [];
    }

    return res.status(200).json({
      success: true,
      data: photoObj,
    });
  } catch (error) {
    console.error("Error fetching photo:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid photo ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while fetching photo",
    });
  }
};

// Create a new photo
export const createPhoto = async (req, res) => {
  try {
    // Extract photo data from request body
    const {
      name,
      title,
      description,
      species,
      location,
      imageUrl,
      userId,
      userName,
    } = req.body;

    // Validate required fields
    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Title and image URL are required",
      });
    }

    // Create new photo with defaults for optional fields
    const photoData = {
      name: name || userName || "Anonymous",
      title,
      description: description || "",
      species: species || "Unknown",
      location: location || "Unknown",
      imageUrl,
      userId: userId || "",
      likes: { count: 0, users: [] },
      comments: [],
    };

    // Create new photo
    const photo = await Photo.create(photoData);

    return res.status(201).json({
      success: true,
      message: "Photo uploaded successfully",
      data: photo,
    });
  } catch (error) {
    console.error("Error creating photo:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating photo",
      error: error.message,
    });
  }
};

// Like a photo
export const likePhoto = async (req, res) => {
  try {
    const { id: photoId } = req.params; // Destructure with consistent naming
    const { userId } = req.body;

    if (!userId) {
      console.log("Like request missing userId");
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    console.log(`Processing like for photo ${photoId} by user ${userId}`);

    const photo = await Photo.findById(photoId);
    if (!photo) {
      console.log(`Photo ${photoId} not found`);
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    // Initialize likes if not present
    if (!photo.likes) {
      photo.likes = { count: 0, users: [] };
    }

    // Check for existing like
    if (photo.likes.users.includes(userId)) {
      console.log(`User ${userId} already liked photo ${photoId}`);
      return res.status(400).json({
        success: false,
        message: "You have already liked this photo",
      });
    }

    // Add like
    photo.likes.users.push(userId);
    photo.likes.count = photo.likes.users.length; // Ensure count is accurate

    await photo.save();
    console.log(
      `Successfully liked photo ${photoId}. New count: ${photo.likes.count}`
    );

    return res.status(200).json({
      success: true,
      message: "Photo liked successfully",
      likes: photo.likes, // Return the full likes object
      photoId, // Include photoId in response
    });
  } catch (error) {
    console.error("Error in likePhoto:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while liking photo",
      error: error.message,
    });
  }
};

// Unlike a photo
export const unlikePhoto = async (req, res) => {
  try {
    const photoId = req.params.id || req.params.photoId;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!photoId) {
      return res.status(400).json({
        success: false,
        message: "Photo ID is required",
      });
    }

    console.log(`Attempting to unlike photo ${photoId} by user ${userId}`);

    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    // Initialize likes if not present
    if (!photo.likes) {
      photo.likes = { count: 0, users: [] };
      await photo.save();
      return res.status(400).json({
        success: false,
        message: "You have not liked this photo",
      });
    }

    // Check if user has liked the photo
    if (!photo.likes.users || !photo.likes.users.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have not liked this photo",
      });
    }

    // Remove user from likes and update count
    photo.likes.users = photo.likes.users.filter((id) => id !== userId);
    // Set count to exactly match the number of users
    photo.likes.count = photo.likes.users.length;

    await photo.save();

    console.log(
      `Photo ${photoId} unliked successfully by user ${userId}. New like count: ${photo.likes.count}`
    );

    return res.status(200).json({
      success: true,
      message: "Photo unliked successfully",
      likes: photo.likes,
    });
  } catch (error) {
    console.error("Error unliking photo:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while unliking photo",
      error: error.message,
    });
  }
};

// Add a comment to a photo
export const addComment = async (req, res) => {
  try {
    const photoId = req.params.id || req.params.photoId;
    const { userId, userName, text } = req.body;

    if (!userId || !userName || !text) {
      return res.status(400).json({
        success: false,
        message: "User ID, name, and comment text are required",
      });
    }

    if (!photoId) {
      return res.status(400).json({
        success: false,
        message: "Photo ID is required",
      });
    }

    console.log(
      `Attempting to add comment to photo ${photoId} by user ${userId}`
    );

    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    // Initialize comments if not present
    if (!photo.comments) {
      photo.comments = [];
    }

    // Add comment
    const newComment = {
      userId,
      userName,
      text,
      createdAt: new Date(),
    };

    photo.comments.push(newComment);

    await photo.save();

    console.log(
      `Comment added to photo ${photoId} by user ${userId}. Total comments: ${photo.comments.length}`
    );

    return res.status(200).json({
      success: true,
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding comment",
      error: error.message,
    });
  }
};

// Delete a photo
export const deletePhoto = async (req, res) => {
  try {
    const photoId = req.params.id || req.params.photoId;

    if (!photoId) {
      return res.status(400).json({
        success: false,
        message: "Photo ID is required",
      });
    }

    const photo = await Photo.findById(photoId);

    if (!photo) {
      return res.status(404).json({
        success: false,
        message: "Photo not found",
      });
    }

    await photo.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Photo deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting photo:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid photo ID",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error while deleting photo",
      error: error.message,
    });
  }
};
