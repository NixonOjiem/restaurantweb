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
        name: user.userName, // NOTE: Changed 'user.name' to 'user.userName' to match your schema
        email: user.email,
        role: user.role, // Including the role is often useful here
      },
    });
};

// --- Local Authentication Handlers ---

/**
 * @desc    Register user (Local Signup)
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
exports.signup = async (req, res, next) => {
  // NOTE: Schema uses 'userName' not 'name'. Destructure accordingly.
  const { userName, email, password, role } = req.body;

  try {
    // Create user in the database (password is auto-hashed via Mongoose pre-save hook)
    const user = await User.create({ userName, email, password, role });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    // Pass the error to the global error handler middleware
    next(err);
  }
};

/**
 * @desc    Log in user (Local Sign-in)
 * @route   POST /api/v1/auth/signin
 * @access  Public
 */
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Basic validation
  if (!email || !password) {
    // Instead of a custom ErrorResponse, create a standard JavaScript Error and set a status property,
    // or just use next(new Error('...')) to let the global handler manage it.
    const error = new Error("Please provide an email and password");
    error.statusCode = 400;
    return next(error);
  }

  try {
    // 2. Find user by email and explicitly select the password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    // 3. Check if password matches using the Mongoose instance method
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    // 4. If credentials are valid, send JWT token response
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
