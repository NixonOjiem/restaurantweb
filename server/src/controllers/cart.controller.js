const Cart = require("../models/Cart.model");
const Menu = require("../models/Menu.model");

// @desc    Get current user's cart
// @route   GET /restaurant/v1/cart
// @access  Private
exports.getCart = async (req, res) => {
  // 2. Get User ID safely (Handles both 'id' from JWT and '_id' from Mongoose)
  const userId = req.user.id || req.user._id;
  try {
    // Find the active cart for the logged-in user
    let cart = await Cart.findOne({
      user: userId,
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
  // 1. Extract inputs
  const { menuItemId, quantity, instructions } = req.body;
  const qty = quantity ? parseInt(quantity) : 1;

  // 2. Get User ID safely (Handles both 'id' from JWT and '_id' from Mongoose)
  const userId = req.user.id || req.user._id;

  try {
    // 3. Validate the Menu Item exists
    const menuItem = await Menu.findById(menuItemId);
    if (!menuItem) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // 4. Determine the price (Snapshot Strategy)
    const currentPrice = menuItem.discountPrice || menuItem.price;

    // 5. Find the user's active cart using the userId variable defined above
    let cart = await Cart.findOne({ user: userId, status: "active" });

    if (cart) {
      // --- SCENARIO A: Cart Exists (Update it) ---

      // Check if this specific item is already in the cart
      const itemIndex = cart.items.findIndex(
        (item) => item.menuItem.toString() === menuItemId
      );

      if (itemIndex > -1) {
        // A1. Item exists: Update quantity
        cart.items[itemIndex].quantity += qty;

        // Update instructions only if new ones are provided
        if (instructions) {
          cart.items[itemIndex].instructions = instructions;
        }
      } else {
        // A2. Item does not exist in this cart: Push new item
        cart.items.push({
          menuItem: menuItemId,
          quantity: qty,
          price: currentPrice,
          instructions: instructions || "",
          total: currentPrice * qty,
        });
      }
    } else {
      // --- SCENARIO B: No Cart Exists (Create New) ---

      // THIS IS WHERE YOUR ERROR WAS HAPPENING
      // We must explicitly pass the 'user' field here.
      cart = await Cart.create({
        user: userId, // <--- The Fix: associating the cart with the user ID
        status: "active",
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

    // 6. Save the cart
    await cart.save();

    // 7. Return the cart (populated)
    await cart.populate("items.menuItem", "title image price slug");

    res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update item quantity (increment/decrement)
// @route   PUT /restaurant/v1/cart/:itemId
// @access  Private
exports.updateCartItem = async (req, res) => {
  const { itemId } = req.params; // This is the _id of the *item inside the array*, not the menuId
  const { quantity } = req.body;
  const userId = req.user.id || req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId, status: "active" });

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
  const userId = req.user.id || req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId, status: "active" });

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
  const userId = req.user.id || req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId, status: "active" });

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
