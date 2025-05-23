import mongoose from "mongoose"; 

const campaignSchema = new mongoose.Schema( 
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    raised: { type: String, required: true },
    goal: { type: String, required: true }, 
    image: { type: String, required: true },
  },
  { timestamps: true } 
);

const Campaign = mongoose.model("Campaign", campaignSchema); 

export default Campaign;
