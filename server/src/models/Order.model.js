const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // We embed items directly so if product price changes later,
    // this order record remains historically accurate.
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
        name: String,
        quantity: Number,
        price: Number,
        image: String,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      building: String,
      doorNumber: String,
      instructions: String,
      location: {
        lat: Number,
        lng: Number,
      },
    },
    paymentInfo: {
      method: { type: String, enum: ["MPESA", "CASH"], default: "MPESA" },
      mpesaNumber: String,
      contactNumber: String,
      transactionId: String, // From M-Pesa Callback
      status: {
        type: String,
        enum: ["PENDING", "COMPLETED", "FAILED"],
        default: "PENDING",
      },
    },
    orderStatus: {
      type: String,
      enum: ["RECEIVED", "PREPARING", "ON_THE_WAY", "DELIVERED", "CANCELLED"],
      default: "RECEIVED",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
