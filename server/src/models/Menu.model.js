const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Provide a title"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please Provide a Description"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "Please Provide a Description"],
    unique: true,
  },
  image: {
    type: String,
    required: [true, "Please Provide an Image"],
    unique: true,
  },
  rating: {
    type: Number,
    required: [true, "Please Provide the rating"],
    unique: true,
  },
  reviewCount: {
    type: Number,
    required: [true, "Please Provide the rating"],
    unique: true,
  },
});

module.exports = mongoose.model("Menu", MenuSchema);
