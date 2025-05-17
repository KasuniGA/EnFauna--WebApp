import mongoose from "mongoose"
import dotenv from "dotenv"
import Photo from "../models/photo.model.js"
import { connectDB } from "../config/db.js"
import { db } from "../config/firebase-admin.js"

// Load environment variables
dotenv.config()

// Connect to MongoDB
connectDB()

const fixPhotoData = async () => {
  try {
    console.log("Connecting to database...")

    // Get all photos from MongoDB
    const photos = await Photo.find()
    console.log(`Found ${photos.length} photos to fix in MongoDB`)

    let updatedCount = 0

    // Fix each photo in MongoDB
    for (const photo of photos) {
      let needsUpdate = false

      // Fix likes
      if (!photo.likes) {
        photo.likes = { count: 0, users: [] }
        needsUpdate = true
      } else if (!photo.likes.users) {
        photo.likes.users = []
        photo.likes.count = 0
        needsUpdate = true
      } else if (photo.likes.count !== photo.likes.users.length) {
        // Fix count to match the number of users
        photo.likes.count = photo.likes.users.length
        needsUpdate = true
      }

      // Fix comments
      if (!photo.comments) {
        photo.comments = []
        needsUpdate = true
      }

      // Save if needed
      if (needsUpdate) {
        await photo.save()
        updatedCount++
        console.log(`Fixed photo ${photo._id} in MongoDB`)
      }

      // Also save to Firestore
      try {
        const photoRef = db.collection("photos").doc(photo._id.toString())
        const photoDoc = await photoRef.get()

        if (!photoDoc.exists) {
          // Create new document in Firestore
          await photoRef.set({
            ...photo.toObject(),
            _id: photo._id.toString(),
            createdAt: photo.createdAt ? photo.createdAt.toISOString() : new Date().toISOString(),
            updatedAt: photo.updatedAt ? photo.updatedAt.toISOString() : new Date().toISOString(),
            likes: {
              count: photo.likes.users.length,
              users: photo.likes.users,
            },
            comments: photo.comments.map((comment) => ({
              ...comment.toObject(),
              _id: comment._id.toString(),
              createdAt: comment.createdAt ? comment.createdAt.toISOString() : new Date().toISOString(),
            })),
          })
          console.log(`Created photo ${photo._id} in Firestore`)
        } else {
          // Update existing document in Firestore
          await photoRef.update({
            likes: {
              count: photo.likes.users.length,
              users: photo.likes.users,
            },
            comments: photo.comments.map((comment) => ({
              ...comment.toObject(),
              _id: comment._id.toString(),
              createdAt: comment.createdAt ? comment.createdAt.toISOString() : new Date().toISOString(),
            })),
            updatedAt: new Date().toISOString(),
          })
          console.log(`Updated photo ${photo._id} in Firestore`)
        }
      } catch (firestoreError) {
        console.error(`Error saving photo ${photo._id} to Firestore:`, firestoreError)
      }
    }

    console.log(`Fixed ${updatedCount} photos in MongoDB and synced with Firestore`)
    console.log("Database update complete!")
  } catch (error) {
    console.error("Error fixing photo data:", error)
  } finally {
    // Close the connection
    mongoose.connection.close()
    process.exit(0)
  }
}

// Run the fix
fixPhotoData()
