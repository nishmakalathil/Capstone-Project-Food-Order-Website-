const Cart = require('../Models/cartModel');
const MenuItem = require('../Models/menuItemsModel');
const User = require('../Models/userModel');


const addToCart = async (req, res) => {
  try {

    const userId = req.user.id; 
    const { menuItemId, quantity } = req.body;

    
    if (!menuItemId || !quantity || quantity <= 0) {
      return res.status(400).json({ message: 'Menu item ID and quantity are required' });
    }

    
    const menuItem = await MenuItem.findById(menuItemId).populate('restaurant_id');
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const price = menuItem.price;
    const image = menuItem.image;
    const name = menuItem.name;

    let cart = await Cart.findOne({ userId });

    
    if (cart && cart.menuItems.length > 0) {
      

    
      

      if (cart.restaurant_id && cart.restaurant_id != menuItem.restaurant_id.id) {
        return res.status(400).json({
            message: "You can only add items from the same restaurant. Please clear your cart first.",
        });
      }
    }
    else {
      
      cart = new Cart({
          userId,
          restaurant_id: menuItem.restaurant_id.id, 
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
    

    
    cart.calculateTotalPrice();

    // Save cart
    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error: ' + error.message });
  }
};



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

    
    const itemIndex = cart.menuItems.findIndex(
      (item) => item._id.toString() === menuItemId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    
    const menuItem = await MenuItem.findById(cart.menuItems[itemIndex].menuItemId);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    
    const oldQuantity = cart.menuItems[itemIndex].quantity;
    cart.menuItems[itemIndex].quantity = quantity;  
    cart.menuItems[itemIndex].menuItemId= menuItem;  

    
    cart.totalPrice += (quantity - oldQuantity) * menuItem.price;

    
    cart.calculateTotalPrice(); 

    
    await cart.save();

    
    res.status(200).json({ message: 'Cart updated successfully', cart });

  } catch (error) {
    res.status(500).json({ message: 'Error updating cart', error });
  }
};



 

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

    console.log("Item Index");
    console.log(itemIndex);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    const itemToRemove = cart.menuItems[itemIndex];

    
    cart.totalPrice -= itemToRemove.price * itemToRemove.quantity;
    cart.totalQuantity -= itemToRemove.quantity;

    
    cart.menuItems.splice(itemIndex, 1);

    await cart.save();

    
    if(itemIndex == 0)
    {
      await Cart.findByIdAndDelete(cart._id);
    }

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error during item removal:', error); 
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



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

    
    await Cart.findByIdAndDelete(cart._id);

    res.status(200).json({ message: 'Cart cleared successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error clearing cart: ' + error.message });
  }
};



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


const applyCoupon = async (req, res) => {
  try {
    const userId = req.user.id;
    const { couponCode, discount } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    
    cart.applyCoupon(couponCode, discount);

    
    await cart.save();

    res.status(200).json({ message: 'Coupon applied successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error applying coupon', error });
  }
};

module.exports = { addToCart, getCart, removeMenuItemFromCart, clearCart, updateMenuItemQuantity, applyCoupon };