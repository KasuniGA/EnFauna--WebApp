import mongoose from "mongoose"; // ✅ Correct import

const spotlightSchema = new mongoose.Schema( // ✅ Use lowercase `mongoose`
  {
    name: { type: String, required: true },
    habitat: { type: String, required: true },
    population: { type: String, required: true },
    threats: { type: String, required: true },
    efforts: { type: String, required: true },
    programs: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true } // ✅ Adds createdAt and updatedAt automatically
);

const Spotlight = mongoose.model("Spotlight", spotlightSchema); // ✅ Use lowercase `mongoose`

export default Spotlight;
