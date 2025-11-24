const mongoose = require("mongoose");

const applyUserMethods = require("../middleware/userMethods");

const UserSchema = new mongoose.Schema({
  // Standard local authentication fields
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    // Password is not required if the user signs up via Google
    required: function () {
      return !this.googleId;
    },
    minlength: [6, "Password must be at least 6 characters"],
    select: false, // Prevents the password hash from being returned by default
  },

  // Fields for Google/OAuth authentication
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values, as not all users will have a googleId
  },

  // Common fields
  userName: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
  },
  role: {
    type: String,
    // Add default value
    default: "user",
    // Add enum to restrict values to 'user' or 'admin'
    enum: ["user", "admin"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

applyUserMethods(UserSchema);

module.exports = mongoose.model("User", UserSchema);
