const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * Applies Mongoose middleware and instance methods to the UserSchema.
 * @param {mongoose.Schema} UserSchema - The Mongoose Schema to modify.
 */
function applyUserMethods(UserSchema) {
  // --- Mongoose Middleware (Pre-Save Hooks) ---

  // 1. Hash the password before saving the User document
  UserSchema.pre("save", async function () {
    // Only run this function if password was actually modified (or is new)
    if (!this.isModified("password") || !this.password) {
      // Return without hashing if criteria not met.
      // Mongoose treats a synchronous return as success.
      return;
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // Do NOT call next() here. The Promise returned by this async function
    // will implicitly tell Mongoose that the middleware is complete.
  });

  // --- Mongoose Instance Methods ---

  // 2. Generate and return a JWT
  UserSchema.methods.getSignedJwtToken = function () {
    // The payload should contain data that uniquely identifies the user
    return jwt.sign(
      { id: this._id },
      process.env.JWT_SECRET, // Should be an environment variable
      { expiresIn: process.env.JWT_EXPIRE } // e.g., '30d'
    );
  };

  // 3. Compare the entered password with the hashed password in the database
  UserSchema.methods.matchPassword = async function (enteredPassword) {
    // The 'this.password' is available here because we explicitly requested it in the controller
    // with .select('+password') or similar logic.
    return await bcrypt.compare(enteredPassword, this.password);
  };
}

module.exports = applyUserMethods;
