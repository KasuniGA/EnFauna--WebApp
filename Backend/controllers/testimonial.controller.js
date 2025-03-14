import Testimonial from "../models/testimonial.model.js";
import mongoose from "mongoose";

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({});
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createTestimonial = async (req, res) => {
  const { name, description } = req.body; // Extract fields

  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const newTestimonial = new Testimonial({
      name,
      description,
    });
    await newTestimonial.save();
    res.status(201).json({ success: true, data: newTestimonial });
  } catch (error) {
    console.error("Error creating testimonials:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTestimonial = async (req, res) => {
  const { id } = req.params;

  const testimonial = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      testimonial,
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, message: "Testimonial updated" });
  } catch (error) {
    console.error("Error updating testimonial:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteTestimonial = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    // Check if the testimonial exists
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found" });
    }

    // Attempt to delete the testimonial
    await Testimonial.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Testimonial deleted" });
  } catch (error) {
    console.error("Error deleting testimonial:", error); // Log the error
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
