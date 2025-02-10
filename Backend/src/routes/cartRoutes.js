const express = require('express');
const cartRouter = express.Router();
const {
  addToCart,            // Ensure this function is correctly imported
  getCart,
  removeMenuItemFromCart,
  updateMenuItemQuantity,
  clearCart,
  applyCoupon,
} = require('../controllers/cartControllers');   // Make sure the paths and function names are correct
const userAuth = require('../middlewares/userAuth');

// Route to add an item to the cart (POST)
cartRouter.post('/add-to-cart', userAuth, addToCart);   // Ensure 'addToCart' function is valid and imported

// Route to get the user's cart (GET)
cartRouter.get('/get-cart', userAuth, getCart);

// Route to remove an item from the cart (DELETE)
cartRouter.delete('/remove-from-cart', userAuth, removeMenuItemFromCart);

// Route to update the quantity of a menu item in the cart (PUT)
cartRouter.put('/update-quantity', userAuth, updateMenuItemQuantity); // Ensure 'updateMenuItemQuantity' is valid and imported

// Route to clear the cart (DELETE)
cartRouter.post('/clear-cart', userAuth, clearCart);

// Route to apply a coupon to the cart (POST)
cartRouter.post('/apply-coupon', userAuth, applyCoupon);

module.exports = cartRouter;
