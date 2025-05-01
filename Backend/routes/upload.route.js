import express from "express"
import {
  getPhotos,
  getPhoto,
  createPhoto,
  deletePhoto,
} from "../controllers/upload.controller.js"
import { addComment, likePhoto, unlikePhoto } from "../controllers/photo.controller.js"

const router = express.Router()

// GET all photos
router.get("/", getPhotos)

// GET single photo
router.get("/:id", getPhoto)

// POST create new photo
router.post("/", createPhoto)

// POST like a photo
router.post("/:id/like", likePhoto)

// POST unlike a photo
router.post("/:id/unlike", unlikePhoto)

// POST add a comment
router.post("/:id/comment", addComment)

// DELETE photo
router.delete("/:id", deletePhoto)

export default router
