const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Menu = require("../models/Menu.model");
// const mpesaService = require('../services/mpesaService'); // We will build this later

exports.initiateCheckout = async (req, res) => {
  try {
    const userId = req.user.id;
    // Use 'payment' object from frontend payload
    const { building, doorNumber, instructions, location, payment } = req.body;

    // 1. Find User's Cart & Populate 'menuItem' (matches your schema)
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.menuItem"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2. Format Items for Order
    // We Map: Cart Schema (menuItem) -> Order Schema (product)
    let calculatedTotal = 0;

    const orderItems = cart.items.map((item) => {
      // Use the live price from the Menu item (safer) OR the snapshot in your cart
      // Let's use the Cart's snapshot price since your schema enforces it
      const itemTotal = item.price * item.quantity;
      calculatedTotal += itemTotal;

      return {
        product: item.menuItem._id, // Map 'menuItem' ID to Order's 'product' field
        name: item.menuItem.name, // Get name from populated Menu item
        price: item.price, // Use price from Cart snapshot
        image: item.menuItem.image, // Get image from populated Menu item
        quantity: item.quantity,
      };
    });

    // 3. Create the Order Record
    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount: calculatedTotal,
      deliveryAddress: {
        building: building || "N/A", // Fallbacks to prevent validation errors
        doorNumber: doorNumber || "N/A",
        instructions: instructions || "",
        location: {
          lat: location?.lat || 0,
          lng: location?.lng || 0,
        },
      },
      paymentInfo: {
        method: payment.method,
        mpesaNumber: payment.mpesaNumber,
        contactNumber: payment.contactNumber,
        status: "PENDING",
      },
    });

    const savedOrder = await newOrder.save();

    // 4. TODO: TRIGGER MPESA STK PUSH HERE
    // await mpesaService.stkPush(payment.mpesaNumber, calculatedTotal, savedOrder._id);
    console.log(
      `Simulating M-Pesa STK Push to ${payment.mpesaNumber} for Ksh ${calculatedTotal}`
    );

    // 5. Clear the User's Cart
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
