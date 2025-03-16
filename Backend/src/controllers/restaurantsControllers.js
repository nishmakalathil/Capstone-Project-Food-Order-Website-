const mongoose = require('mongoose');
const Restaurants = require('../Models/restaurantsModel'); // Adjust path if necessary
const cloudinaryInstance = require('../config/cloudinaryConfig.js');
const multer = require('multer');

const createRestaurant = async (req, res) => {
  try {
    // The owner_id is now automatically attached to req.owner_id by the middleware
    const { name, address, phone_number, delivery_hours, delivery_areas, average_delivery_time, owner_id } = req.body;
    //const owner_id = req.owner_id; // Get owner_id from middleware (extracted from JWT)
    // Validate required fields
    if (!name || !address || !phone_number || !delivery_hours || !delivery_areas || !average_delivery_time || !owner_id) {
      return res.status(400).json({ error: 'Restaturant - All fields are required' });
    }
    // Ensure file is present in the request
    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }
    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
    // Create a new restaurant instance
    const newRestaurant = new Restaurants({
      owner_id, // The owner_id extracted from the token
      name,
      address,
      phone_number,
      delivery_hours,
      delivery_areas,
      average_delivery_time,
      image: cloudinaryResponse.url || '', // Default image field to an empty string if not provided
    });
    // Save the new restaurant to the database
    await newRestaurant.save();
    // Return a success response with the created restaurant
    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant: newRestaurant
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error creating the restaurant' });
  }
};


//get all restaurants

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurants.find();  // Get all restaurants

        res.status(200).json(restaurants);  // Send the list of restaurants
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch restaurants", error: error.message });
    }
};


//get single restaurant

const getSingleRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;  // Get the restaurant ID from the URL parameter
        

        const restaurant = await Restaurants.findById(id);  // Find the restaurant by its ID
       

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json(restaurant);  // Return the restaurant data
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

//update
const updateRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone_number, delivery_hours, delivery_areas, average_delivery_time } = req.body;
    
    // Validate the restaurant ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }

    // Construct update object dynamically (only include provided fields)
    const updateData = {};
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (phone_number) updateData.phone_number = phone_number;
    if (delivery_hours) updateData.delivery_hours = delivery_hours;
    if (delivery_areas) updateData.delivery_areas = delivery_areas;
    if (average_delivery_time) updateData.average_delivery_time = average_delivery_time;

    // Handle image upload if a file is provided
    if (req.file && req.file.path) {
      try {
        const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
        updateData.image = cloudinaryResponse.secure_url; //  Use `secure_url` for HTTPS images
      } catch (cloudinaryError) {
        console.error("Cloudinary Upload Error:", cloudinaryError);
        return res.status(500).json({ message: "Error uploading image: " + cloudinaryError.message });
      }
    }

    // Find and update restaurant
    const updatedRestaurant = await Restaurants.findByIdAndUpdate(id, updateData, {
      new: true,            // Return updated document
      runValidators: true,  // Ensure fields follow schema validation
    });

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    // Success response
    res.status(200).json({
      message: "Restaurant updated successfully.",
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Internal server error: " + error.message });
  }
};



// Controller to delete a restaurant by ID

const deleteRestaurant = async (req, res) => {
    try {
        const ownerId = req.restaurantOwner.id;
        const { restaurantID } = req.body;  // Extract the restaurant ID from the request body

        // Check if the ID is valid (optional but useful)
        if (!restaurantID) {
            return res.status(400).json({ message: "Restaurant ID is required" });
        }

        const restaurant = await Restaurants.findOneAndDelete({ _id: restaurantID });

        console.log(restaurant);  // Log for debugging

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found or not authorized" });
        }

        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};



const getRestaurantsByOwner = async (req, res) => {
  // Ensure you're correctly accessing the owner's ID
  const ownerId = req.restaurantOwner.id; // or req.user.id depending on how you set up your authentication
  
  // Validate the ownerId
  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(400).json({ message: 'Invalid ownerId format' });
  }

  try {
    // Fetch restaurants by owner_id
    const restaurants = await Restaurants.find({ owner_id: ownerId });

    if (!restaurants || restaurants.length === 0) {
      return res.status(200).json({ message: 'No restaurants found for this owner' });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




  


module.exports = {createRestaurant,getAllRestaurants,getSingleRestaurantById,updateRestaurantById,deleteRestaurant, getRestaurantsByOwner};
