const express = require("express");
const { initiateCheckout } = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware"); // Ensure user is logged in
const router = express.Router();
router.use(protect);

// POST /restaurant/v1/orders/checkout
router.post("/checkout", initiateCheckout);

module.exports = router;
