const express = require('express');
const restaurantOwnerRouter = express.Router();

const restaurantOwnerAuth = require("../middlewares/restaurantOwnerAuth.js");

const {
    restaurantOwnerSignup,
    restaurantOwnerLogin,
    getRestaurantOwnerProfile,
    updateRestaurantOwnerProfile ,
    checkRestaurantOwner,
    restaurantOwnerLogout
} = require("../controllers/restaurantOwnerControllers.js");

// Sign up route
restaurantOwnerRouter.post("/signup", restaurantOwnerSignup);

// Login route
restaurantOwnerRouter.post("/login", restaurantOwnerLogin);

// Profile view route
restaurantOwnerRouter.get("/profile", restaurantOwnerAuth, getRestaurantOwnerProfile);

// updateRestaurantOwnerProfile
restaurantOwnerRouter.put('/update',restaurantOwnerAuth,updateRestaurantOwnerProfile );

//check restaturant owner
restaurantOwnerRouter.get('/check-restaurant-owner',restaurantOwnerAuth, checkRestaurantOwner);
                                         
//Logout
restaurantOwnerRouter.post("/logout",restaurantOwnerAuth,restaurantOwnerLogout);


module.exports = restaurantOwnerRouter;