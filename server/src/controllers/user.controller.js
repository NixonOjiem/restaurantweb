const User = require("../models/User.model");
const ErrorResponse = require("../config/errorHandler");

/**
 * @desc    Get current user profile (The 'Me' route)
 * @route   GET /restaurant/v1/profile/me
 * @access  Private
 */
exports.getMe = async (req, res, next) => {
  try {
    // req.user contains only the decoded JWT payload, so fetch the full user
    const user = await User.findById(req.user.id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------------------------------

/**
 * @desc    Update user details (name, email, role)
 * @route   PUT /restaurant/v1/profile/updatedetails
 * @access  Private
 */
exports.updateDetails = async (req, res, next) => {
  const fieldsToUpdate = {
    userName: req.body.userName,
    email: req.body.email,
    //role: req.body.role, // Assuming you allow a user to change their role, otherwise restrict this!
  };

  try {
    // Find the user by ID (from the token) and update the fields.
    // Mongoose pre/post hooks run when using .save(), but not .findByIdAndUpdate.
    // We use { new: true } to return the updated document.
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      // This should only happen if the user's ID in the token is invalid or deleted.
      const error = new Error("User not found.");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------------------------------

/**
 * @desc    Update user password
 * @route   PUT /restaurant/v1/profile/updatepassword
 * @access  Private
 */
exports.updatePassword = async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    const error = new Error("Please provide both current and new passwords.");
    error.statusCode = 400;
    return next(error);
  }

  try {
    // 1. Get the user document, explicitly selecting the password field.
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      return next(error);
    }

    // 2. Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      const error = new Error("Current password is incorrect.");
      error.statusCode = 401;
      return next(error);
    }

    // 3. Update the password field and manually trigger save to run the pre('save') hash hook.
    user.password = newPassword;
    await user.save(); // The pre('save') hook in your model hashes this new password.

    // 4. Send a token response (optional, but good practice to renew JWT after password change)
    // You would typically define a sendTokenResponse function here or import it from authController
    // Since we don't have it, we'll just send a success message.
    res.status(200).json({
      success: true,
      message: "Password successfully updated.",
      // You can optionally generate and send a new token here.
    });
  } catch (err) {
    next(err);
  }
};

// ------------------------------------------------------------------

/**
 * @desc    Soft delete user (Set deletedAt field)
 * @route   DELETE /restaurant/v1/profile/:id
 * @access  Private (Admin or Owner)
 */
exports.deleteUser = async (req, res, next) => {
  try {
    // Soft delete the user by setting the deletedAt timestamp
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { deletedAt: Date.now() },
      { new: true }
    );

    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: {}, // Conventionally send an empty data object on delete
      message: "User account successfully deactivated.",
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get all users with pagination
 * @route   GET /restaurant/v1/profile/admin-all
 * @access  Private (Admin)
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    // Filter out soft-deleted users if you want, or remove this line to see everyone
    const query = { deletedAt: null };

    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select("-password") // Exclude passwords
      .sort({ createdAt: -1 }) // Newest first
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: users.length,
      pagination: {
        page,
        totalPages: Math.ceil(total / limit),
        totalUsers: total,
      },
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a specific user (Admin)
 * @route   DELETE /restaurant/v1/profile/admin-delete/:id
 * @access  Private (Admin)
 */
exports.deleteUserById = async (req, res, next) => {
  try {
    // Prevent deleting yourself
    if (req.params.id === req.user.id) {
      const error = new Error(
        "You cannot delete your own admin account from here."
      );
      error.statusCode = 400;
      return next(error);
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { deletedAt: Date.now() }, // Soft delete
      { new: true }
    );

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: {},
    });
  } catch (err) {
    next(err);
  }
};
