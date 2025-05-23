import mongoose from "mongoose"; 

const testimonialSchema = new mongoose.Schema( 
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    
  },
  { timestamps: true } 
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema); 

export default Testimonial;
