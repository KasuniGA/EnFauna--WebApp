import express from "express";
import { getReports, createReport } from "../controllers/report.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "public/Images" });

// Route to get all reports
router.get("/", getReports);

// Route to create a new report
router.post(
  "/",
  upload.fields([{ name: "photos" }, { name: "videos" }]),
  createReport
);



export default router;
