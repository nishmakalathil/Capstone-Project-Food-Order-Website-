const Cart = require('../Models/cartModel');
const MenuItem = require('../Models/menuItemsModel');
const User = require('../Models/userModel');

// Add Item to Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId, quantity } = req.body;

    if (!menuItemId || !quantity) {
      return res.status(400).json({ message: 'Menu item ID and quantity are required' });
    }

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const price = menuItem.price;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        menuItems: [
          {
            menuItemId,
            quantity,
            price,
          },
        ],
        totalPrice: price * quantity,
        totalQuantity: quantity,
        status: 'Pending',
      });
    } else {
      const existingItemIndex = cart.menuItems.findIndex(
        (item) => item.menuItemId.toString() === menuItemId.toString()
      );

      if (existingItemIndex >= 0) {
        cart.menuItems[existingItemIndex].quantity += quantity;
      } else {
        cart.menuItems.push({
          menuItemId,
          quantity,
          price,
        });
      }

      cart.calculateTotalPrice(); // Recalculate total price and total quantity
    }

    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message });
  }
};

// Update Item Quantity
const updateMenuItemQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId, quantity } = req.body;

    if (!menuItemId || quantity <= 0) {
      return res.status(400).json({ message: 'Valid menu item ID and quantity are required' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.menuItems.findIndex((item) => item.menuItemId.toString() === menuItemId.toString());
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Update the quantity and recalculate the total price and total quantity
    const oldQuantity = cart.menuItems[itemIndex].quantity;
    cart.menuItems[itemIndex].quantity = quantity;

    // Update total price
    cart.totalPrice += (quantity - oldQuantity) * menuItem.price;
    cart.calculateTotalPrice(); // Recalculate the total quantity

    await cart.save();

    res.status(200).json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
};

// Remove Item from Cart
const removeMenuItemFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { menuItemId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.menuItems.findIndex((item) => item.menuItemId.toString() === menuItemId.toString());
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const itemToRemove = cart.menuItems[itemIndex];

    // Recalculate total price and total quantity
    cart.totalPrice -= itemToRemove.price * itemToRemove.quantity;
    cart.totalQuantity -= itemToRemove.quantity;

    // Remove the item
    cart.menuItems.splice(itemIndex, 1);

    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.menuItems = [];
    cart.totalPrice = 0;
    cart.totalQuantity = 0;

    await cart.save();

    res.status(200).json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate('menuItems.menuItemId', 'name price image');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for the given user.' });
    }

    return res.status(200).json({
      message: 'Cart retrieved successfully',
      cart,
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return res.status(500).json({ message: 'Error: ' + error.message });
  }
};

// Apply Coupon to Cart
const applyCouponToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { couponCode, discount } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Apply coupon
    cart.applyCoupon(couponCode, discount);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Coupon applied successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error applying coupon', error });
  }
};

module.exports = { addToCart, getCart, removeMenuItemFromCart, clearCart, updateMenuItemQuantity, applyCouponToCart };
