const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Get all users (admin only)
exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Only admin can access all users
  if (req.user.role !== "admin") {
    return next(new AppError("Not authorized to access all users", 403));
  }

  const users = await User.find().select("-password");

  res.status(200).json({
    success: true,
    data: users,
  });
});

// Get user by ID (admin only)
exports.getUserById = catchAsync(async (req, res, next) => {
  // Only admin can access specific user
  if (req.user.role !== "admin") {
    return next(new AppError("Not authorized to access user details", 403));
  }

  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Update user (admin only)
exports.updateUser = catchAsync(async (req, res, next) => {
  // Only admin can update users
  if (req.user.role !== "admin") {
    return next(new AppError("Not authorized to update users", 403));
  }

  const { name, email, role } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// Delete user (admin only)
exports.deleteUser = catchAsync(async (req, res, next) => {
  // Only admin can delete users
  if (req.user.role !== "admin") {
    return next(new AppError("Not authorized to delete users", 403));
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});

// Update my profile
exports.updateMyProfile = catchAsync(async (req, res, next) => {
  const { name, language, darkMode } = req.body;

  // Handle profile image if provided
  if (req.file) {
    req.body.profileImage = req.file.path;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name, language, darkMode, profileImage: req.body.profileImage },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});

// Update only the user's role (admin only)
exports.updateUserRole = catchAsync(async (req, res, next) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});