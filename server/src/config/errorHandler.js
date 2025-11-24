// errorHandler.js

/**
 * Global Express error handling middleware.
 * This function must have four arguments: (err, req, res, next).
 * It catches all errors passed to next(err) in your routes and controllers.
 */
const errorHandler = (err, req, res, next) => {
  // Start with the error object we received
  let error = { ...err };

  // This ensures we capture the message, even if it's not enumerable
  error.message = err.message;

  // Log the error in the console for debugging
  console.error(err.stack.red);

  // --- Mongoose Error Handling ---

  // 1. Mongoose Bad ObjectId (e.g., trying to find a user with a malformed ID)
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = { statusCode: 404, message };
  }

  // 2. Mongoose Duplicate Key (Code 11000) (e.g., duplicate email)
  if (err.code === 11000) {
    // Extract the field that caused the duplicate key error (e.g., 'email')
    const field = Object.keys(err.keyValue).join(", ");
    const message = `Duplicate field value entered for **${field}**: ${err.keyValue[field]}`;
    error = { statusCode: 400, message };
  }

  // 3. Mongoose Validation Error (e.g., missing required field, bad email format)
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    const message = `Validation failed: ${messages.join(", ")}`;
    error = { statusCode: 400, message };
  }

  // --- Send Final Response ---
  res.status(error.statusCode || 500).json({
    success: false,
    // Use the error message, or a generic server message for unknown errors
    error: error.message || "Server Error",
  });
};

module.exports = errorHandler;
