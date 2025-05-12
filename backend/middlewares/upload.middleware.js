const multer = require("multer");
const path = require("path");
const AppError = require("../utils/appError");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Check file type
const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(
      new AppError(
        "Please upload image files only (jpg, jpeg, png, gif).",
        400
      ),
      false
    );
  }
  cb(null, true);
};

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: fileFilter,
});

// Upload middleware for event images
exports.uploadEventImage = upload.single("image");

// Upload middleware for profile images
exports.uploadProfileImage = upload.single("profileImage");
