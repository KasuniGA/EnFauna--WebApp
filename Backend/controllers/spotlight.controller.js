import Spotlight from "../models/spotlight.model.js";
import mongoose from "mongoose";

export const getSpotlights = async (req, res) => {
  try {
    const spotlights = await Spotlight.find({});
    res.status(200).json({ success: true, data: spotlights });
  } catch (error) {
    console.error("Error fetching spotlights:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createSpotlights = async (req, res) => {
  const { name, habitat, population, threats, efforts, programs, image } =
    req.body; // Extract fields

  if (
    !name ||
    !habitat ||
    !population ||
    !threats ||
    !efforts ||
    !programs ||
    !image
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const newSpotlight = new Spotlight({
      name,
      habitat,
      population,
      threats,
      efforts,
      programs,
      image,
    });
    await newSpotlight.save();
    res.status(201).json({ success: true, data: newSpotlight });
  } catch (error) {
    console.error("Error creating spotlight:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateSpotlight = async (req, res) => {
  const { id } = req.params;

  const spotlight = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updatedSpotlight = await Spotlight.findByIdAndUpdate(id, spotlight, {
      new: true,
    });
    res.status(200).json({ success: true, message: "Spotlight updated" });
  } catch (error) {
    console.error("Error updating spotlight:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteSpotlight = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    // Check if the spotlight exists
    const spotlight = await Spotlight.findById(id);
    if (!spotlight) {
      return res
        .status(404)
        .json({ success: false, message: "Spotlight not found" });
    }

    // Attempt to delete the spotlight
    await Spotlight.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Spotlight deleted" });
  } catch (error) {
    console.error("Error deleting spotlight:", error); // Log the error
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
