const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require("../controllers/cart.controller"); // Ensure this path matches your file structure
const { protect } = require("../middleware/auth.middleware"); // Ensure this path matches your middleware location

const router = express.Router();

// Apply the protect middleware to all routes in this file
// This ensures that only logged-in users can access cart features
router.use(protect);

router.get("/", getCart); // GET /restaurant/v1/cart
router.post("/add-cart", addToCart); // POST /restaurant/v1/cart/add-cart
router.put("/:itemId", updateCartItem); // PUT /restaurant/v1/cart/:itemId
router.delete("/remove-item/:itemId", removeFromCart); // DELETE /restaurant/v1/cart/remove-item/:itemId
router.delete("/clear-cart", clearCart); // DELETE /restaurant/v1/cart/clear-cart

module.exports = router;
