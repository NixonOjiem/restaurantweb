const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Menu = require("../models/Menu.model");
const User = require("../models/User.model");
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
        name: item.menuItem.title, // Get name from populated Menu item
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

// @desc    Get logged in user orders
// @route   GET /restaurant/orders/myorders
// @access  Private
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      // We populate the 'product' field inside the 'items' array
      .populate({
        path: "items.product",
        select: "title image", // Only fetch the title and image
        model: "Menu",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get User Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /restaurant/v1/orders/admin-orders
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Order.find()
      .populate("user", "name email phoneNumber") // Populating user details is crucial for Admin to know WHO ordered
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Admin Get All Orders Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /restaurant/orders/admin/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    // Validate status against your Enum in the model
    const validStatuses = [
      "RECEIVED",
      "PREPARING",
      "ON_THE_WAY",
      "DELIVERED",
      "CANCELLED",
    ];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus: status },
      { new: true } // Return the updated document
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      order,
    });
  } catch (error) {
    console.error("Update Status Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// @desc    Get Dashboard Stats
// @route   GET /restaurant/v1/orders/dashboard-stats
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const queryDate = req.query.date ? new Date(req.query.date) : now;

    const startOfMonth = new Date(
      queryDate.getFullYear(),
      queryDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      queryDate.getFullYear(),
      queryDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );

    const [userCount, menuCount, orderStats, popularItems, dailyRevenue] =
      await Promise.all([
        // A. Total Users
        User.countDocuments({ role: "user" }),

        // B. Available Menu Items
        Menu.countDocuments({}),

        // C. Order Statuses
        Order.aggregate([
          { $match: { createdAt: { $gte: startOfMonth, $lte: endOfMonth } } },
          {
            $facet: {
              byOrderStatus: [
                { $group: { _id: "$orderStatus", count: { $sum: 1 } } },
              ],
              byPaymentStatus: [
                { $group: { _id: "$paymentInfo.status", count: { $sum: 1 } } },
              ],
              revenue: [
                { $match: { "paymentInfo.status": "COMPLETED" } },
                { $group: { _id: null, total: { $sum: "$totalAmount" } } },
              ],
            },
          },
        ]),

        // D. Popular Dishes (UPDATED WITH LOOKUP)
        Order.aggregate([
          { $unwind: "$items" },
          // 1. Join with the 'menus' collection to get the real title
          {
            $lookup: {
              from: "menus", // This must match your MongoDB collection name (usually lowercase plural of model)
              localField: "items.product",
              foreignField: "_id",
              as: "menuItem",
            },
          },
          // 2. Unwind the looked-up array (since lookup returns an array)
          { $unwind: "$menuItem" },
          // 3. Group by the Title from the MENU collection, not the Order
          {
            $group: {
              _id: "$menuItem.title",
              count: { $sum: "$items.quantity" },
              revenue: {
                $sum: { $multiply: ["$items.price", "$items.quantity"] },
              },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 4 },
        ]),

        // E. Daily Sales
        Order.aggregate([
          {
            $match: {
              createdAt: { $gte: startOfMonth, $lte: endOfMonth },
              "paymentInfo.status": "COMPLETED",
            },
          },
          {
            $group: {
              _id: {
                $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
              },
              dailyTotal: { $sum: "$totalAmount" },
            },
          },
          { $sort: { _id: 1 } },
        ]),
      ]);

    const stats = orderStats[0];
    const formatCounts = (arr) =>
      arr.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {});

    res.status(200).json({
      success: true,
      data: {
        totals: {
          users: userCount,
          menuItems: menuCount,
          revenue: stats.revenue[0]?.total || 0,
          orders: stats.byOrderStatus.reduce(
            (acc, curr) => acc + curr.count,
            0
          ),
        },
        orderStatus: formatCounts(stats.byOrderStatus),
        paymentStatus: formatCounts(stats.byPaymentStatus),
        popularItems,
        dailyRevenue,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
