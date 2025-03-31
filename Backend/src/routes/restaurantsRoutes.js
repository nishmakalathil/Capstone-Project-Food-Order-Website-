const express = require('express');
const restaurantsRouter = express.Router();

const {createRestaurant, getAllRestaurants, getSingleRestaurantById, updateRestaurantById, deleteRestaurant, getRestaurantsByOwner }= require('../controllers/restaurantsControllers.js');

const restaurantOwnerAuth = require("../middlewares/restaurantOwnerAuth.js");
const upload = require("../middlewares/multer.js");


//create
restaurantsRouter.post('/create', restaurantOwnerAuth, upload.single('image'),createRestaurant );

// Route to get all restaurants
restaurantsRouter.get('/get-all', getAllRestaurants);


//Route to get a restaurant by ID
restaurantsRouter.get('/get-single/:id', getSingleRestaurantById);

//update restaurants by Id
restaurantsRouter.put('/update/:id', restaurantOwnerAuth, upload.single('image'), updateRestaurantById);

//delete restaurants
restaurantsRouter.delete('/delete-restaurants', restaurantOwnerAuth, deleteRestaurant);


restaurantsRouter.get('/owner/:ownerId', restaurantOwnerAuth, getRestaurantsByOwner);





module.exports = restaurantsRouter;
