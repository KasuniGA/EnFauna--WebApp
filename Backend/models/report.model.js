import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    // Reporter Information (optional if anonymous)
    reporter: {
      name: { type: String, trim: true, default: "" }, // Name of the reporter
      contact: { type: String, trim: true, default: "" }, // Contact number of the reporter
    },
    isAnonymous: { type: Boolean, default: false }, // Whether the report is anonymous

    // Incident Details
    incidentType: {
      type: String,
      required: true,
      enum: ["wildlife", "poaching", "habitat", "injured", "other"], // Allowed incident types
    },
    description: { type: String, required: true, trim: true }, // Description of the incident
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"], // Priority level
      default: "medium",
    },

    // Location and Timing
    location: {
      type: {
        type: String,
        enum: ["Point"], // Geospatial format (must be "Point")
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: function (coords) {
            return coords.length === 2 && 
                   coords.every(num => typeof num === "number");
          },
          message: "Coordinates must be an array of [longitude, latitude].",
        },
      },
    },
    date: { type: Date, required: true }, // Date of the incident
    time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Ensures time is in HH:mm format
    },

    // Visual Documentation
    photos: [{ type: String, trim: true }], // Array of photo file paths or URLs
    videos: [{ type: String, trim: true }], // Array of video file paths or URLs

    // Status Tracking
    status: {
      type: String,
      enum: ["pending", "under_review", "resolved", "closed"], // Report status
      default: "pending",
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// Geospatial index for location queries
reportSchema.index({ location: "2dsphere" });

// Middleware to clear reporter details if report is anonymous
reportSchema.pre("save", function (next) {
  if (this.isAnonymous) {
    this.reporter = { name: "", contact: "" }; // Ensure name/contact are cleared
  }
  next();
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
