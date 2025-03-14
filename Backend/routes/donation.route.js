import express from "express";
import {
  createDonation,
  deleteDonation,
  getDonations,
  updateDonation,
} from "../controllers/donation.controller.js";

const router = express.Router();

router.get("/", getDonations);

router.post("/", createDonation);

router.put("/:id", updateDonation);

router.delete("/:id", deleteDonation);

export default router;
