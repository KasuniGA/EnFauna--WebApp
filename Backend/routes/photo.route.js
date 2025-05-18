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
router.get("/", getPhotos) // Changed from "/all" to "/" for consistency

// Get a single photo
router.get("/:id", getPhoto)

// Create a new photo
router.post("/", createPhoto)

// Like a photo
router.post("/:id/like", likePhoto) // Changed from :photoId to :id for consistency

// Unlike a photo
router.post("/:id/unlike", unlikePhoto) // Changed from :photoId to :id for consistency

// Add a comment to a photo
router.post("/:id/comment", addComment) // Changed from :photoId to :id for consistency

// Delete a photo
router.delete("/:id", deletePhoto)

export default router