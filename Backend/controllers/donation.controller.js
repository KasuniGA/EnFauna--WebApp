import Donation from "../models/donation.model.js";
import mongoose from "mongoose";

export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find({});
    res.status(200).json({ success: true, data: donations });
  } catch (error) {
    console.error("Error fetching donations:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createDonation = async (req, res) => {
  const { name, type, description, amount, image } = req.body; // Extract fields

  if (!name || !type || !description || !amount || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const newDonation = new Donation({
      name,
      type,
      description,
      amount,
      image,
    });
    await newDonation.save();
    res.status(201).json({ success: true, data: newDonation });
  } catch (error) {
    console.error("Error creating donation:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateDonation = async (req, res) => {
  const { id } = req.params;

  const donation = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updatedDonation = await Donation.findByIdAndUpdate(id, donation, {
      new: true,
    });
    res.status(200).json({ success: true, message: "Donation updated" });
  } catch (error) {
    console.error("Error updating donation:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteDonation = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    // Check if the donation exists
    const donation = await Donation.findById(id);
    if (!donation) {
      return res
        .status(404)
        .json({ success: false, message: "Donation not found" });
    }

    // Attempt to delete the donation
    await Donation.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Donation deleted" });
  } catch (error) {
    console.error("Error deleting donation:", error); // Log the error
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
