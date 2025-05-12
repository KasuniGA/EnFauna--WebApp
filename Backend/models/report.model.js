import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      name: { type: String, trim: true, default: "" },
      contact: { type: String, trim: true, default: "" },
    },
    isAnonymous: { type: Boolean, default: false },
    incidentType: {
      type: String,
      required: true,
      enum: ["wildlife", "poaching", "habitat", "injured", "other"],
    },
    description: { type: String, required: true, trim: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    date: { type: Date, required: true },
    time: {
      type: String,
      required: true,
      match: /^([01]\d|2[0-3]):([0-5]\d)$/,
    },
    photos: [{ type: String, trim: true }], // Array of photo URLs
    videos: [{ type: String, trim: true }], // Array of video URLs
    status: {
      type: String,
      enum: ["pending", "under_review", "resolved", "closed"],
      default: "pending",
    },
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
  },
  { timestamps: true }
);

reportSchema.index({ location: "2dsphere" });

reportSchema.pre("save", function (next) {
  if (this.isAnonymous) {
    this.reporter = { name: "", contact: "" };
  }
  next();
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
