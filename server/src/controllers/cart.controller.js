const Cart = require("../models/Cart.model");
const Menu = require("../models/Menu.model");

// @desc    Get current user's cart
// @route   GET /restaurant/v1/cart
// @access  Private
exports.getCart = async (req, res) => {
  try {
    // Find the active cart for the logged-in user
    let cart = await Cart.findOne({
      user: req.user._id,
      status: "active",
    }).populate("items.menuItem", "title image price slug category"); // Populate specific fields to save bandwidth

    // If no cart exists, return a standardized empty response
    if (!cart) {
      return res.status(200).json({
        success: true,
        data: {
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
        },
      });
    }

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /restaurant/v1/cart/add-cart
// @access  Private
exports.addToCart = async (req, res) => {
  const { menuItemId, quantity, instructions } = req.body;

  // Default quantity to 1 if not provided
  const qty = quantity ? parseInt(quantity) : 1;

  try {
    // 1. Validate the Menu Item exists
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // 2. Determine the price (Snapshot Strategy)
    // Use discountPrice if it exists, otherwise regular price
    const currentPrice = menuItem.discountPrice || menuItem.price;

    // 3. Find the user's active cart
    let cart = await Cart.findOne({ user: req.user._id, status: "active" });

    if (cart) {
      // --- SCENARIO A: Cart Exists ---

      // Check if this specific item is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.menuItem.toString() === menuItemId
      );

      if (itemIndex > -1) {
        // A1. Item exists: Update quantity
        cart.items[itemIndex].quantity += qty;

        // Optional: Update instructions if new ones are provided
        if (instructions) {
          cart.items[itemIndex].instructions = instructions;
        }
      } else {
        // A2. Item does not exist: Push new item
        cart.items.push({
          menuItem: menuItemId,
          quantity: qty,
          price: currentPrice, // Saving the snapshot
          instructions: instructions || "",
          total: currentPrice * qty, // Initial total calculation
        });
      }
    } else {
      // --- SCENARIO B: No Cart Exists (Create New) ---
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            menuItem: menuItemId,
            quantity: qty,
            price: currentPrice,
            instructions: instructions || "",
            total: currentPrice * qty,
          },
        ],
      });
    }

    // 4. Save the cart
    // The pre('save') hook in your Model will automatically calculate
    // totalQuantity and totalPrice
    await cart.save();

    // 5. Return the cart (populate it so frontend can update UI immediately)
    await cart.populate("items.menuItem", "title image price slug");

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update item quantity (increment/decrement)
// @route   PUT /restaurant/v1/cart/:itemId
// @access  Private
exports.updateCartItem = async (req, res) => {
  const { itemId } = req.params; // This is the _id of the *item inside the array*, not the menuId
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user._id, status: "active" });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Find the specific item in the items array
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    if (quantity === 0) {
      // If quantity sent is 0, remove the item
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save(); // Triggers recalculation
    await cart.populate("items.menuItem", "title image price slug");

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Remove specific item from cart
// @route   DELETE /restaurant/v1/cart/remove-item/:itemId
// @access  Private
exports.removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id, status: "active" });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    // Use Mongoose 'pull' to remove the item by its _id
    cart.items.pull(itemId);

    await cart.save(); // Recalculate totals
    await cart.populate("items.menuItem", "title image price slug");

    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Clear entire cart
// @route   DELETE /restaurant/v1/cart/clear-cart
// @access  Private
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id, status: "active" });

    if (cart) {
      cart.items = [];
      cart.totalQuantity = 0;
      cart.totalPrice = 0;
      await cart.save();
    }

    res.status(200).json({
      success: true,
      message: "Cart cleared",
      data: [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
