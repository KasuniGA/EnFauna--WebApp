import mongoose from "mongoose";

// Define the schema
const photoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [50, "Title cannot be more than 50 characters"],
    },
    description: {
      type: String,
      required: false,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please add an image URL"],
    },
    category: {
      type: String,
      required: false,
      enum: ["nature", "wildlife", "landscape", "other"],
      default: "other",
    },
    tags: {
      type: [String],
      required: false,
      default: [],
    },
    location: {
      type: String,
      required: false,
    },
    captureDate: {
      type: Date,
      required: false,
      default: Date.now,
    },
    photographer: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    exif: {
      camera: {
        type: String,
        required: false,
      },
      lens: {
        type: String,
        required: false,
      },
      focalLength: {
        type: String,
        required: false,
      },
      shutterSpeed: {
        type: String,
        required: false,
      },
      aperture: {
        type: String,
        required: false,
      },
      iso: {
        type: Number,
        required: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model exists before creating it
// This prevents the "OverwriteModelError" when the model is imported multiple times
const Photo = mongoose.models.Photo || mongoose.model("Photo", photoSchema);

console.log("Photo model defined successfully");

export default Photo;
