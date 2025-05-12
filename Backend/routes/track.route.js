import express from "express";
import { getReportStatus } from "../controllers/track.controller.js";

const router = express.Router();

router.get("/track/status/:referenceNumber", getReportStatus);

export default router;
