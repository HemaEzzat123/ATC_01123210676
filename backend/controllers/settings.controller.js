const Settings = require("../models/settings.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Get all settings
exports.getAllSettings = catchAsync(async (req, res) => {
  const settings = await Settings.find()
    .populate("updatedBy", "name email")
    .sort({ category: 1, key: 1 });

  res.json({
    success: true,
    data: settings,
  });
});

// Get settings by category
exports.getSettingsByCategory = catchAsync(async (req, res) => {
  const { category } = req.params;
  const settings = await Settings.find({ category }).populate(
    "updatedBy",
    "name email"
  );

  res.json({
    success: true,
    data: settings,
  });
});

// Get a single setting
exports.getSetting = catchAsync(async (req, res) => {
  const { key } = req.params;
  const setting = await Settings.findOne({ key }).populate(
    "updatedBy",
    "name email"
  );

  if (!setting) {
    throw new AppError("Setting not found", 404);
  }

  res.json({
    success: true,
    data: setting,
  });
});

// Create a new setting
exports.createSetting = catchAsync(async (req, res) => {
  const { key, value, description, category, isPublic } = req.body;

  // Check if setting already exists
  const existingSetting = await Settings.findOne({ key });
  if (existingSetting) {
    throw new AppError("Setting with this key already exists", 400);
  }

  const setting = await Settings.create({
    key,
    value,
    description,
    category,
    isPublic,
    updatedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    data: setting,
  });
});

// Update a setting
exports.updateSetting = catchAsync(async (req, res) => {
  const { key } = req.params;
  const { value, description, category, isPublic } = req.body;

  const setting = await Settings.findOne({ key });
  if (!setting) {
    throw new AppError("Setting not found", 404);
  }

  // Update only provided fields
  if (value !== undefined) setting.value = value;
  if (description !== undefined) setting.description = description;
  if (category !== undefined) setting.category = category;
  if (isPublic !== undefined) setting.isPublic = isPublic;
  setting.updatedBy = req.user._id;

  await setting.save();

  res.json({
    success: true,
    data: setting,
  });
});

// Delete a setting
exports.deleteSetting = catchAsync(async (req, res) => {
  const { key } = req.params;

  const setting = await Settings.findOne({ key });
  if (!setting) {
    throw new AppError("Setting not found", 404);
  }

  await setting.deleteOne();

  res.json({
    success: true,
    data: null,
  });
});

// Get public settings
exports.getPublicSettings = catchAsync(async (req, res) => {
  const settings = await Settings.find({ isPublic: true })
    .select("key value category")
    .sort({ category: 1, key: 1 });

  res.json({
    success: true,
    data: settings,
  });
});
