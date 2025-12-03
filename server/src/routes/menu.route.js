const express = require("express");
const router = express.Router();

// Import the middlewares
const { protect } = require("../middleware/auth.middleware");
const { admin } = require("../middleware/admin.middleware");

// Import your controller (assuming you have created these functions)
const {
  postToMenuItems,
  fetchFromMenuItems,
  updateMenuItem,
  deleteMenuItem,
  fetchSingleMenuItem,
} = require("../controllers/menu.controller");

// --- PUBLIC ROUTES (No token needed) ---
// Anyone can view the menu
router.get("/menu-fetch/", fetchFromMenuItems);
router.get("/fetch-item/:id", fetchSingleMenuItem);

// --- PROTECTED ADMIN ROUTES ---
// We chain 'protect' (to decode token) and then 'admin' (to check role)

// Create a new menu item
router.post("/add-menu-item", protect, admin, postToMenuItems);

// Update a menu item
router.put("/update-menu-item/:id", protect, admin, updateMenuItem);

// Delete a menu item
router.delete("/delete-menu-item/:id", protect, admin, deleteMenuItem);

module.exports = router;
