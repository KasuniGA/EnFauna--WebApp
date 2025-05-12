import Track from "../models/track.model.js";

export const getReportStatus = async (req, res) => {
  try {
    const track = await Track.findOne(
      { referenceNumber: req.params.referenceNumber },
      { status: 1, feedback: 1, referenceNumber: 1, _id: 0 }
    );

    if (!track) {
      return res.status(404).json({
        success: false,
        message: "Report not found with this reference number"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        referenceNumber: track.referenceNumber,
        status: track.status,
        feedback: track.feedback
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching report status"
    });
  }
};