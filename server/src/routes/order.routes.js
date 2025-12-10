const express = require("express");
const router = express.Router();
const {
  initiateCheckout,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");
const { admin } = require("../middleware/admin.middleware");
const { protect } = require("../middleware/auth.middleware"); // Ensure user is logged in

router.use(protect);

// POST /restaurant/v1/orders/checkout used to post orders
router.post("/checkout", initiateCheckout);

//Get User Orders (only loggedin users)
router.get("/myorders", protect, getUserOrders);

//Admin Routes
//get all orders
router.get("/admin-orders", protect, admin, getAllOrders);

// Update Status (e.g., mark as DELIVERED)
router.put("/admin-orders/:id/status", protect, admin, updateOrderStatus);

module.exports = router;
