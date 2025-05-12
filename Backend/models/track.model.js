import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "under_review", "resolved", "closed"],
      default: "pending",
    },
    feedback: {
      type: String,
      default: "Your report is being processed.",
    },
  },
  { timestamps: true }
);

trackSchema.index({ referenceNumber: 1 }, { unique: true });

const Track = mongoose.model("Track", trackSchema);
export default Track;
