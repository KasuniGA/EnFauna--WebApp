import mongoose from "mongoose"; 

const donationSchema = new mongoose.Schema( 
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: String, required: true }, 
    image: { type: String, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

const Donation = mongoose.model("Donation", donationSchema); 

export default Donation;
