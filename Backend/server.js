import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import donationRoutes from "./routes/donation.route.js";
import campaignRoutes from "./routes/campaign.route.js";
import reportRoutes from "./routes/report.route.js";
import testimonialRoutes from "./routes/testimonial.route.js";
import spotlightRoutes from "./routes/spotlight.route.js";

dotenv.config();

// Connect to database before starting the server
connectDB();

const app = express();
// Serve static files from the 'public' directory
app.use(express.static("public"));

app.use(cors());

app.use(express.json()); // Middleware to parse JSON

// Routes
app.use("/api/donations", donationRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/spotlights", spotlightRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server is running at http://localhost:" + PORT);
});
