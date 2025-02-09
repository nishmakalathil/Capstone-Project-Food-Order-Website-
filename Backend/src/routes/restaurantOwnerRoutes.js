const express = require('express');
const restaurantOwnerRouter = express.Router();

const restaurantOwnerAuth = require("../middlewares/restaurantOwnerAuth.js");

const {
    restaurantOwnerSignup,
    restaurantOwnerLogin,
    getRestaurantOwnerProfile,
    updateRestaurantOwnerProfile ,
    
    
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





                                           
//Logout
restaurantOwnerRouter.put("/logout",restaurantOwnerAuth,restaurantOwnerLogout);


module.exports = restaurantOwnerRouter;
