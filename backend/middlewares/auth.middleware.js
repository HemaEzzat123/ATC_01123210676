const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Protect routes middleware
exports.verifyToken = catchAsync(async (req, res, next) => {
  // 1) Get token and check if it exists
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please log in to get access", 401)
    );
  }

  try {
    // 2) Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError("The user belonging to this token no longer exists", 401)
      );
    }

    // 4) Grant access to protected route
    req.user = currentUser;
    next();
  } catch (error) {
    return next(new AppError("Invalid token. Please log in again", 401));
  }
});

// Restrict to certain roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

// Check if user is authenticated, but don't block if not (for optional auth)
exports.optionalAuth = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(); // Continue without setting req.user
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (currentUser) {
      req.user = currentUser;
    }

    next();
  } catch (error) {
    next(); // Continue without setting req.user if token is invalid
  }
});

// Check if user is admin
exports.isAdmin = catchAsync(async (req, res, next) => {
  // First verify the token
  await exports.verifyToken(req, res, () => {
    // Then check if user is admin
    if (req.user.role !== "admin") {
      return next(
        new AppError("You do not have permission to access this resource", 403)
      );
    }
    next();
  });
});
