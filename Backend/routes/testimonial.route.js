import express from "express";
import {
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
} from "../controllers/testimonial.controller.js";

const router = express.Router();

router.get("/", getTestimonials);

router.post("/", createTestimonial);

router.put("/:id", updateTestimonial);

router.delete("/:id", deleteTestimonial);

export default router;
