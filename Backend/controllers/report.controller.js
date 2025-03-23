import Report from "../models/report.model.js";

// Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find({});
    res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.error("Error fetching reports:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create a new report
export const createReport = async (req, res) => {
  const {
    isAnonymous,
    incidentType,
    description,
    date,
    time,
    name,
    contact,
    priority,
    longitude,
    latitude,
  } = req.body;

  // Extract photos and videos from the request body
  const photos = req.body.photos || [];
  const videos = req.body.videos || [];

  // Validate required fields
  if (
    !incidentType ||
    !description ||
    !date ||
    !time ||
    !longitude ||
    !latitude
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }

  try {
    const newReport = new Report({
      isAnonymous,
      incidentType,
      description,
      date: new Date(date),
      time,
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      priority: priority || "medium",
      photos,
      videos,
      status: "pending",
    });

    // Add reporter information if not anonymous
    if (!newReport.isAnonymous) {
      newReport.reporter = {
        name,
        contact,
      };
    }

    await newReport.save();
    res.status(201).json({ success: true, data: newReport });
  } catch (error) {
    console.error("Error creating report:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
