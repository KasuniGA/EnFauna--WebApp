import mongoose from "mongoose"; 

const spotlightSchema = new mongoose.Schema( 
  {
    name: { type: String, required: true },
    habitat: { type: String, required: true },
    population: { type: String, required: true },
    threats: { type: String, required: true },
    efforts: { type: String, required: true },
    programs: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true } 
);

const Spotlight = mongoose.model("Spotlight", spotlightSchema); 

export default Spotlight;
