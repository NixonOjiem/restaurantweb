const mongoose = require("mongoose");

// 1. Sub-schema for individual items in the cart
const CartItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu", // Links to your Menu model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less than 1."],
    default: 1,
  },
  // CRITICAL: We store the price HERE as a snapshot.
  // If the restaurant changes the menu price later, this cart item remains accurate.
  price: {
    type: Number,
    required: true,
  },
  // Allows users to add notes like "No onions" or "Extra spicy"
  instructions: {
    type: String,
    maxlength: [100, "Instructions cannot be more than 100 characters"],
  },
  // The line total for this specific item (price * quantity)
  total: {
    type: Number,
    required: true,
  },
});

// 2. Main Cart Schema
const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Links to your User model
      required: true,
    },
    items: [CartItemSchema],
    totalQuantity: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    // distinct statuses help you track abandoned carts vs active ones
    status: {
      type: String,
      enum: ["active", "completed", "abandoned"],
      default: "active",
    },
  },
  {
    timestamps: true, // Useful for Cron jobs (e.g., delete carts older than 30 days)
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3. Middleware: Auto-Calculate Totals
// This runs automatically before .save() is called in your controller
CartSchema.pre("save", function (next) {
  // A. Calculate line totals (Price * Qty)
  this.items.forEach((item) => {
    item.total = item.price * item.quantity;
  });

  // B. Calculate Grand Totals
  this.totalQuantity = this.items.reduce((acc, item) => acc + item.quantity, 0);
  this.totalPrice = this.items.reduce((acc, item) => acc + item.total, 0);

  next();
});

module.exports = mongoose.model("Cart", CartSchema);
