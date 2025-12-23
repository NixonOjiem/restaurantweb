const Menu = require("../models/Menu.model");
const { imagekit } = require("../utils/imagekit");
/**
 * @desc    Create a new menu item
 * @route   POST /restaurant/v1/menu/add-menu-item
 * @access  Private (Admin/Restaurant Owner)
 */
exports.postToMenuItems = async (req, res, next) => {
  try {
    let imageUrl = "";

    // 1. Upload the file to ImageKit (if a file was sent)
    if (req.files && req.files.length > 0) {
      const file = req.files[0];
      const result = await imagekit.upload({
        file: file.buffer, // The file data
        fileName: `menu-${Date.now()}-${file.originalname}`,
        folder: "/menu-pic",
      });
      imageUrl = result.url;
    }

    // 2. Parse the stringified JSON fields coming from Frontend
    const ingredients = req.body.ingredients
      ? JSON.parse(req.body.ingredients)
      : [];
    const dietaryInfo = req.body.dietaryInfo
      ? JSON.parse(req.body.dietaryInfo)
      : [];
    const badge = req.body.badge ? JSON.parse(req.body.badge) : [];

    // 3. Save to MongoDB
    const menuItem = await Menu.create({
      ...req.body,
      image: imageUrl, // Save the ImageKit URL, not the file itself
      ingredients,
      dietaryInfo,
      badge,
    });

    res.status(201).json({ success: true, data: menuItem });
  } catch (err) {
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
 * @route   PUT /restaurant/v1/menu/update-menu-item/:id
 * @access  Private
 */
exports.updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Create a copy of the body to manipulate
    let updateData = { ...req.body };

    // Parse stringified arrays back into real arrays
    ["ingredients", "dietaryInfo", "badge"].forEach((field) => {
      if (updateData[field] && typeof updateData[field] === "string") {
        try {
          updateData[field] = JSON.parse(updateData[field]);
        } catch (e) {
          console.console.log(e);
        }
      }
    });

    const menuItem = await Menu.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    res.status(200).json({ success: true, data: menuItem });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete a menu item
 * @route   DELETE /restaurant/v1/menu/delete-menu-item/:id
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

/**
 * @desc    Get a single menu item by ID
 * @route   GET /restaurant/v1/menu/fetch-item/:id
 * @access  Public
 */
exports.fetchSingleMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      const error = new Error(`Menu item not found with id of ${id}`);
      error.statusCode = 404;
      return next(error);
    }

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (err) {
    // If the ID format is invalid (CastError), Mongoose throws an error.
    // Usually, your error handler should catch this, or you can check here.
    next(err);
  }
};
