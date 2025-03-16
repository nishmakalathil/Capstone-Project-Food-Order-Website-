const Cart = require('../Models/cartModel');
const MenuItem = require('../Models/menuItemsModel');
const User = require('../Models/userModel');

// Add Item to Cart
const addToCart = async (req, res) => {
  try {

    const userId = req.user.id; // Assuming user is authenticated
    const { menuItemId, quantity } = req.body;

    // Validation
    if (!menuItemId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Menu item ID and quantity are required' });
    }

    // Check if menuItem exists
    const menuItem = await MenuItem.findById(menuItemId).populate('restaurant_id');
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const price = menuItem.price;
    const image = menuItem.image;
    const name = menuItem.name;

    let cart = await Cart.findOne({ userId });

    // If cart exists and contains items, check restaurant consistency
    if (cart && cart.menuItems.length > 0) {
      // Check if cart belongs to a different restaurant

      //console.log("cart restaurant_id ---- menuItem restaurant_id.id");
      //console.log(cart.restaurant_id +"----"+ menuItem.restaurant_id.id);

      if (cart.restaurant_id && cart.restaurant_id != menuItem.restaurant_id.id) {
        return res.status(400).json({
            message: "You can only add items from the same restaurant. Please clear your cart first.",
        });
      }
    }
    else {
      // If no cart exists, create a new one and set the restaurant_id
      cart = new Cart({
          userId,
          restaurant_id: menuItem.restaurant_id.id, // Set restaurant_id in cart
          menuItems: [],
      });
    }

      const existingItemIndex = cart?.menuItems?.findIndex((item) => item.menuItemId.toString() === menuItemId.toString());
 
      if (existingItemIndex >= 0) {
        cart.menuItems[existingItemIndex].quantity += quantity;
      } else {
        cart.menuItems.push({
          menuItemId,
          quantity,
          price,
          image,
          name,
        });
      }
    

    // Recalculate the total price and quantity
    cart.calculateTotalPrice();

    // Save cart
    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message });
  }
};


// Update item quantity in cart
const updateMenuItemQuantity = async (req, res) => {
  
  try {
    const userId = req.user.id;  // Assuming the user ID is in the request's user object
    const { menuItemId, quantity } = req.body;

    if (!menuItemId || quantity <= 0) {
      return res.status(400).json({ message: 'Valid menu item ID and quantity are required' });
    }

    // Find cart associated with the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the index of the menu item in the cart
    const itemIndex = cart.menuItems.findIndex(
      (item) => item._id.toString() === menuItemId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Fetch menu item to get its price
    const menuItem = await MenuItem.findById(cart.menuItems[itemIndex].menuItemId);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    // Save the old quantity to calculate price difference
    const oldQuantity = cart.menuItems[itemIndex].quantity;
    cart.menuItems[itemIndex].quantity = quantity;  // Update quantity
    cart.menuItems[itemIndex].menuItemId= menuItem;  // Update menu item id

    // Calculate the price difference
    cart.totalPrice += (quantity - oldQuantity) * menuItem.price;

    // Recalculate the total price of the cart
    cart.calculateTotalPrice();  // Assuming you have a method to recalculate prices

    // Save the updated cart
    await cart.save();

    // Return the updated cart
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

    let cart = await Cart.findOne({ userId }).populate('menuItems._id', 'price');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const itemIndex = cart.menuItems.findIndex((item) => {
      return item._id && item._id.toString() === menuItemId.toString();
    });

    console.log(itemIndex);

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
    console.error('Error during item removal:', error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// Clear Cart function
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;  // Assuming you use a JWT token to authenticate and extract user ID

    // Find the user's cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Clear the cart's menu items
    cart.menuItems = [];
    cart.totalPrice = 0;
    cart.totalQuantity = 0;

    // Delete the updated cart
    await Cart.findByIdAndDelete(cart._id);

    res.status(200).json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error clearing cart: ' + error.message });
  }
};


// Get Cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate('menuItems.menuItemId', 'name price image');

    if (!cart) {
      return res.status(200).json({ 
        message: 'Cart is empty for the given user.' ,
      });
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
const applyCoupon = async (req, res) => {
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

module.exports = { addToCart, getCart, removeMenuItemFromCart, clearCart, updateMenuItemQuantity, applyCoupon };