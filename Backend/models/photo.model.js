// import mongoose from "mongoose";

// // Define the schema
// const photoSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Please add a title"],
//       trim: true,
//       maxlength: [50, "Title cannot be more than 50 characters"],
//     },
//     description: {
//       type: String,
//       required: false,
//       maxlength: [500, "Description cannot be more than 500 characters"],
//     },
//     imageUrl: {
//       type: String,
//       required: [true, "Please add an image URL"],
//     },
//     category: {
//       type: String,
//       required: false,
//       enum: ["nature", "wildlife", "landscape", "other"],
//       default: "other",
//     },
//     tags: {
//       type: [String],
//       required: false,
//       default: [],
//     },
//     location: {
//       type: String,
//       required: false,
//     },
//     captureDate: {
//       type: Date,
//       required: false,
//       default: Date.now,
//     },
//     photographer: {
//       type: String,
//       required: false,
//     },
//     likes: {
//       type: Number,
//       default: 0,
//     },
//     featured: {
//       type: Boolean,
//       default: false,
//     },
//     exif: {
//       camera: {
//         type: String,
//         required: false,
//       },
//       lens: {
//         type: String,
//         required: false,
//       },
//       focalLength: {
//         type: String,
//         required: false,
//       },
//       shutterSpeed: {
//         type: String,
//         required: false,
//       },
//       aperture: {
//         type: String,
//         required: false,
//       },
//       iso: {
//         type: Number,
//         required: false,
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Check if the model exists before creating it
// // This prevents the "OverwriteModelError" when the model is imported multiple times
// const Photo = mongoose.models.Photo || mongoose.model("Photo", photoSchema);

// console.log("Photo model defined successfully");

// export default Photo;


import mongoose from "mongoose"

// Define the schema for comments
const commentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: [500, "Comment cannot be more than 500 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Define the schema for likes
const likesSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
    min: 0,
  },
  users: {
    type: [String],
    default: [],
  },
})

// Define the main photo schema
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
    userId: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
      default: "Anonymous",
    },
    species: {
      type: String,
      required: false,
    },
    likes: {
      type: likesSchema,
      default: { count: 0, users: [] },
    },
    comments: {
      type: [commentSchema],
      default: [],
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
  },
)

// Add a pre-save hook to ensure likes.count matches the length of likes.users
photoSchema.pre("save", function (next) {
  if (this.likes && this.likes.users) {
    this.likes.count = this.likes.users.length
  }
  next()
})

// Check if the model exists before creating it
const Photo = mongoose.models.Photo || mongoose.model("Photo", photoSchema)

export default Photo
