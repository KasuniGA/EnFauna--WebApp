import express from "express"
import {
  getPhotos,
  getPhoto,
  createPhoto,
  likePhoto,
  unlikePhoto,
  addComment,
  deletePhoto,
} from "../controllers/photo.controller.js"

const router = express.Router()

// Get all photos
router.get("/all", getPhotos)

// Get a single photo
router.get("/:id", getPhoto)

// Create a new photo
router.post("/", createPhoto)

// Like a photo
router.post("/:photoId/like", likePhoto)

// Unlike a photo
router.post("/:photoId/unlike", unlikePhoto)

// Add a comment to a photo
router.post("/:photoId/comment", addComment)

// Delete a photo
router.delete("/:id", deletePhoto)

export default router
