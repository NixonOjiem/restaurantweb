const Menu = require("../models/Menu.model"); // Adjust path if necessary

/**
 * @desc    Create a new menu item
 * @route   POST /restaurant/v1/menu/menu-post
 * @access  Private (Admin/Restaurant Owner)
 */
exports.postToMenuItems = async (req, res, next) => {
  try {
    // 1. Create the menu item
    // The slug will be automatically created by your pre('save') hook in the model
    const menuItem = await Menu.create(req.body);

    res.status(201).json({
      success: true,
      data: menuItem,
    });
  } catch (err) {
    // Check for duplicate key error (E11000) for title or slug
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0];
      const error = new Error(`A menu item with that ${field} already exists.`);
      error.statusCode = 400;
      return next(error);
    }
    next(err);
  }
};

/**
 * @desc    Get ALL menu items
 * @route   GET /restaurant/v1/menu/menu-fetch
 * @access  Public
 */
exports.fetchFromMenuItems = async (req, res, next) => {
  try {
    // 1. Fetch every single document in the collection
    // We still sort by createdAt (-1) so the newest items appear at the top of the array
    const menuItems = await Menu.find({}).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update a menu item
 * @route   PUT /restaurant/v1/menu/menu-update/:id
 * @access  Private
 */
exports.updateMenuItem = async (req, res, next) => {
  try {
    // Note: You need to pass the ID in the URL, e.g., /menu-update/656c9...
    const { id } = req.params;

    // 1. Find and Update
    const menuItem = await Menu.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated object, not the old one
      runValidators: true, // Ensure price isn't negative, category is valid, etc.
    });

    // 2. Check if item existed
    if (!menuItem) {
      const error = new Error(`Menu item not found with id of ${id}`);
      error.statusCode = 404;
      return next(error);
    }

    // Optional: If title changed, you might want to regenerate the slug here manually
    // or use the "Find -> Edit -> Save" pattern instead of findByIdAndUpdate.

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a menu item
 * @route   DELETE /restaurant/v1/menu/menu-delete/:id
 * @access  Private
 */
exports.deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findByIdAndDelete(id);

    if (!menuItem) {
      const error = new Error(`Menu item not found with id of ${id}`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: {}, // Return empty object on delete
      message: "Menu item deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
