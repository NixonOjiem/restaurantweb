const mongoose = require("mongoose");
const MONGODB_URI = process.env.Mongo_DB_URI;

/**
 * @function connectDB
 * @description Establishes a connection to MongoDB using Mongoose.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("🎉 MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
