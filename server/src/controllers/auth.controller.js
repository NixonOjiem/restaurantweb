const User = require("../models/User.model");

// Utility function to send JWT token in a response
const sendTokenResponse = (user, statusCode, res) => {
  // Get token from model method
  const token = user.getSignedJwtToken();

  // Convert days from environment variable into milliseconds
  const cookieExpireDays = parseInt(process.env.JWT_COOKIE_EXPIRE);
  const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

  // --- THIS IS THE CRITICAL FIX ---
  const options = {
    // Create a new Date object based on the current time + expiration time
    expires: new Date(Date.now() + cookieExpireDays * MILLISECONDS_IN_A_DAY),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options) // Set the token in a cookie
    .json({
      success: true,
      token: token, // Also return the token in the body for easy testing/mobile apps
      user: {
        id: user._id,
        name: user.userName,
        email: user.email,
        role: user.role,
      },
    });
};

// --- Local Authentication Handlers ---

/**
 * @desc    Register user (Local Signup)
 * @route   POST /restaurant/v1/auth/signup
 * @access  Public
 */
exports.signup = async (req, res, next) => {
  const { fullName, userName, email, password, role } = req.body;

  try {
    // 1. Check if a user (active OR soft-deleted) already exists with this email
    let user = await User.findOne({ email });

    if (user) {
      // 2. If user exists, check if they are soft-deleted
      if (user.deletedAt) {
        // Option 2: Reactivate the existing account
        user.deletedAt = null; // Remove the soft-delete marker
        user.fullName = fullName; // Update details
        user.userName = userName;
        user.password = password; // The Mongoose pre-save hook will hash this new password
        user.role = role || user.role; // Allow role update, or keep old one
        await user.save();

        // Log in the now-reactivated user
        return sendTokenResponse(user, 200, res);
      } else {
        // User exists and is active - throw duplicate email error
        const error = new Error("Account with this email already exists.");
        error.statusCode = 400;
        return next(error);
      }
    }

    // 3. If no user found (standard new signup)
    user = await User.create({
      fullName,
      userName,
      email,
      password,
      role,
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    // Mongoose validation or other errors
    next(err);
  }
};

/**
 * @desc    Log in user (Local Sign-in)
 * @route   POST /restaurant/v1/auth/sigin
 * @access  Public
 */
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Basic validation (existing code)
  if (!email || !password) {
    const error = new Error("Please provide an email and password");
    error.statusCode = 400;
    return next(error);
  }

  try {
    // 2. Find user by email, explicitly select password, AND check if deletedAt is NOT set
    const user = await User.findOne({
      email,
      deletedAt: { $exists: false }, // Check if the field does NOT exist
      // OR use: deletedAt: null // If you ensure the field is explicitly set to null by default
    }).select("+password");

    if (!user) {
      // This covers both 'user not found' and 'user is soft-deleted' cases.
      const error = new Error("Invalid credentials or account is deactivated.");
      error.statusCode = 401;
      return next(error);
    }

    // 3. Check if password matches (existing code)
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      const error = new Error("Invalid credentials or account is deactivated.");
      error.statusCode = 401;
      return next(error);
    }

    // 4. If valid, send JWT token response (existing code)
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

// Placeholder for Google Auth (to be implemented next)
exports.googleAuth = async (req, res, next) => {
  // ... logic for Google sign up/in ...
  res
    .status(501)
    .json({ success: false, message: "Google Auth not yet implemented" });
};
