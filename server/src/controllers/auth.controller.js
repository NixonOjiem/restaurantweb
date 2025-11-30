const User = require("../models/User.model");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

  // 1. Basic validation
  if (!email || !password) {
    const error = new Error("Please provide an email and password");
    error.statusCode = 400;
    return next(error);
  }

  try {
    // 2. Find user by email, REGARDLESS of deletedAt status, but select password
    const user = await User.findOne({
      email,
    }).select("+password +deletedAt"); // Select both password and deletedAt

    if (!user) {
      // Handles 'user not found' case
      const error = new Error("Invalid credentials or account is deactivated.");
      error.statusCode = 401;
      return next(error);
    }

    // --- ✅ NEW LOGIC: Check for soft-deletion ---
    if (user.deletedAt) {
      const error = new Error("Account is currently deactivated or deleted.");
      error.statusCode = 401;
      return next(error);
    }
    // ---------------------------------------------

    // 3. Password Matching Logic (uncommented)
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      // The same generic message is used here for security (to avoid confirming a valid email)
      const error = new Error("Invalid credentials or account is deactivated.");
      error.statusCode = 401;
      return next(error);
    }

    // 4. If valid and not deleted, send JWT token response
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Google Sign-up/Sign-in handler
 * @route   POST /restaurant/v1/auth/googleauth
 * @access  Public
 */
exports.googleAuth = async (req, res, next) => {
  const { idToken } = req.body;
  if (!idToken) {
    const error = new Error("Google ID token is missing.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    // 1. Verify the ID Token with Google
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    // Get the user data from the verified payload
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Note: Google's 'name' is usually full name. We use it for fullName/userName
    const userName = name.split(" ")[0] + Date.now().toString().slice(-4); // Generate unique username if needed
    const fullName = name;

    // 2. Check if a user with this email already exists
    let user = await User.findOne({ email });

    if (user) {
      // Handle soft-delete and sign-in for existing user
      if (user.deletedAt) {
        // Reactivate soft-deleted account
        user.deletedAt = null;
        user.fullName = fullName;
        user.userName = user.userName || userName; // Keep old userName if it exists
        user.googleId = payload.sub; // Link Google ID for future checks
        await user.save({ validateBeforeSave: false }); // Skip password validation
        console.log("Google Auth: Account Reactivated");
      } else {
        // User is active, ensure Google ID is linked if not already
        if (!user.googleId) {
          user.googleId = payload.sub;
          await user.save({ validateBeforeSave: false });
        }
        console.log("Google Auth: Existing User Signed In");
      }

      // Log in the existing/reactivated user
      return sendTokenResponse(user, 200, res);
    } else {
      // 3. New User Sign-up
      const newUser = await User.create({
        fullName: fullName,
        userName: userName, // Use the generated/parsed username
        email: email,
        googleId: payload.sub, // Store the unique Google ID
        role: "user", // Assign default role
      });

      console.log("Google Auth: New User Signed Up");
      return sendTokenResponse(newUser, 201, res);
    }
  } catch (err) {
    console.error("Google verification failed:", err);
    const error = new Error(
      "Google sign-in failed. Invalid token or server error."
    );
    error.statusCode = 401;
    next(error);
  }
};
