const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model"); // Assuming you have this
const Menu = require("../models/Menu.model"); // Assuming you have this
// const mpesaService = require('../services/mpesaService'); // We will build this later

exports.initiateCheckout = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id; // From your Auth Middleware
    const { building, doorNumber, instructions, location, payment } = req.body;

    // 1. Find User's Cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Calculate Total & Format Items for Order
    // We recalculate price on backend for security (don't trust frontend prices)
    let calculatedTotal = 0;
    const orderItems = cart.items.map((item) => {
      const itemTotal = item.product.price * item.quantity;
      calculatedTotal += itemTotal;

      return {
        product: item.product._id,
        name: item.product.name,
        price: item.product.price, // Snapshot current price
        image: item.product.image,
        quantity: item.quantity,
      };
    });

    // 3. Create the Order Record
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount: calculatedTotal,
      deliveryAddress: {
        building,
        doorNumber,
        instructions,
        location: {
          lat: location.lat,
          lng: location.lng,
        },
      },
      paymentInfo: {
        method: payment.method,
        mpesaNumber: payment.mpesaNumber,
        contactNumber: payment.contactNumber,
        status: "PENDING", // Default
      },
    });

    const savedOrder = await newOrder.save();

    // 4. TODO: TRIGGER MPESA STK PUSH HERE
    // await mpesaService.stkPush(payment.mpesaNumber, calculatedTotal, savedOrder._id);
    console.log(
      `Simulating M-Pesa STK Push to ${payment.mpesaNumber} for Ksh ${calculatedTotal}`
    );

    // 5. Clear the User's Cart
    // We empty it because the Order has been created.
    // If payment fails, the user retries payment on the Order, not the Cart.
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully. Check phone for M-Pesa PIN.",
      orderId: savedOrder._id,
      order: savedOrder,
    });
  } catch (error) {
    console.error("Checkout Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
