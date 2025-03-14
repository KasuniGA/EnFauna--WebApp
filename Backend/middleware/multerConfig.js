import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the 'public/Images' directory exists
const dir = "public/Images";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Multer configuration for uploading files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, dir); // Save files in the 'public/Images' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "video/mp4"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, GIF, and MP4 are allowed."),
      false
    );
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 15000000 }, // 15MB file size limit
  fileFilter: fileFilter,
}).fields([
  { name: "photos", maxCount: 5 }, // Up to 5 photo files
  { name: "videos", maxCount: 5 }, // Up to 5 video files
]);

export default upload;