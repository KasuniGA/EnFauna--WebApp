import mongoose from "mongoose"; // ✅ Correct import

const testimonialSchema = new mongoose.Schema( // ✅ Use lowercase `mongoose`
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    
  },
  { timestamps: true } // ✅ Adds createdAt and updatedAt automatically
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema); // ✅ Use lowercase `mongoose`

export default Testimonial;
