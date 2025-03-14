import express from "express";
import {
  createSpotlights,
  deleteSpotlight,
  getSpotlights,
  updateSpotlight,
} from "../controllers/spotlight.controller.js";

const router = express.Router();

router.get("/", getSpotlights);

router.post("/", createSpotlights);

router.put("/:id", updateSpotlight);

router.delete("/:id", deleteSpotlight);

export default router;
