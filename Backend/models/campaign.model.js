import mongoose from "mongoose"; // ✅ Correct import

const campaignSchema = new mongoose.Schema( // ✅ Use lowercase `mongoose`
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    raised: { type: String, required: true },
    goal: { type: String, required: true }, 
    image: { type: String, required: true },
  },
  { timestamps: true } // ✅ Adds createdAt and updatedAt automatically
);

const Campaign = mongoose.model("Campaign", campaignSchema); // ✅ Use lowercase `mongoose`

export default Campaign;
