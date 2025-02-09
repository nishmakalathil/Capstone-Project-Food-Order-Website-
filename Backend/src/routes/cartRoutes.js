const express = require("express");
const cartRouter = express.Router();
const {addToCart,getCart, removeMenuItemFromCart,updateMenuItemQuantity,clearCart,applyCouponToCart} = require("../controllers/cartControllers.js");
const userAuth  = require("../middlewares/userAuth.js");


//addtocart
cartRouter.post("/add-to-cart",userAuth,addToCart,) ;

//getcart
cartRouter.get("/get-cart", userAuth, getCart);

// Route to remove an item from the cart
cartRouter.delete('/remove-from-cart', userAuth,removeMenuItemFromCart);


// Route to update the quantity of a menu item in the cart
cartRouter.put('/update-quantity', userAuth, updateMenuItemQuantity);


//Clear Cart
cartRouter.post('/clear-cart', userAuth, clearCart);


//coupon

// Apply coupon to cart
cartRouter.put("/apply-coupon", userAuth, applyCouponToCart);

module.exports = cartRouter;