import Campaign from "../models/campaign.model.js";
import mongoose from "mongoose";

export const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({});
    res.status(200).json({ success: true, data: campaigns });
  } catch (error) {
    console.error("Error fetching campaigns:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createCampaign = async (req, res) => {
  const { name, raised, description, goal, image } = req.body; // Extract fields

  if (!name || !raised || !description || !goal || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const newCampaign = new Campaign({
      name,
      raised,
      description,
      goal,
      image,
    });
    await newCampaign.save();
    res.status(201).json({ success: true, data: newCampaign });
  } catch (error) {
    console.error("Error creating campaign:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateCampaign = async (req, res) => {
  const { id } = req.params;

  const campaign = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(id, campaign, {
      new: true,
    });
    res.status(200).json({ success: true, message: "Campaign updated" });
  } catch (error) {
    console.error("Error updating Campaign:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteCampaign = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    // Check if the Campaign exists
    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res
        .status(404)
        .json({ success: false, message: "Campaign not found" });
    }

    // Attempt to delete the Campaign
    await Campaign.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Campaign deleted" });
  } catch (error) {
    console.error("Error deleting Campaign:", error); // Log the error
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
