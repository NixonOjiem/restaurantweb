const express = require("express");
const router = express.Router();
const { initiateCheckout } = require("../controllers/order.controller");
const { protect } = require("../middleware/auth.middleware"); // Ensure user is logged in

router.use(protect);

// POST /restaurant/v1/orders/checkout
router.post("/checkout", initiateCheckout);

module.exports = router;
