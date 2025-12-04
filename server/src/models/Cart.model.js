const mongoose = require("mongoose");

// 1. Sub-schema for individual items in the cart
const CartItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less than 1."],
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  instructions: {
    type: String,
    maxlength: [100, "Instructions cannot be more than 100 characters"],
  },
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
      ref: "User",
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
    status: {
      type: String,
      enum: ["active", "completed", "abandoned"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3. Middleware: Auto-Calculate Totals
// FIX APPLIED: Changed to 'async function()' and removed 'next'
CartSchema.pre("save", async function () {
  // Optional optimization: Only recalculate if items have changed
  // if (!this.isModified('items')) return;

  // A. Calculate line totals (Price * Qty)
  if (this.items && this.items.length > 0) {
    this.items.forEach((item) => {
      item.total = item.price * item.quantity;
    });

    // B. Calculate Grand Totals
    this.totalQuantity = this.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    this.totalPrice = this.items.reduce((acc, item) => acc + item.total, 0);
  } else {
    // Handle empty cart case
    this.totalQuantity = 0;
    this.totalPrice = 0;
  }

  // No next() call is needed with async functions
});

module.exports = mongoose.model("Cart", CartSchema);
