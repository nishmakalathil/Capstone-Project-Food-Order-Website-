const MenuItem = require("../Models/menuItemsModel.js");
const cloudinaryInstance = require('../config/cloudinaryConfig.js');
const mongoose = require('mongoose');  // Import mongoose to validate ObjectId
const Restaurants = require("../Models/restaurantsModel.js");

// Function to validate ObjectId for all ID-based requests
const validateObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

// Create Menu Item
const createMenuItems = async (req, res) => {
    try {
      const { name, description, price, category, isAvailable, ingredients, restaurant_id } = req.body;
      if (!name || !description || !price || !category || !restaurant_id || !ingredients) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      if (!req.file) {  // Check if the file is being uploaded
        return res.status(400).json({ message: "Image is required" });
      }
  
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      
      const newMenuItem = new MenuItem({
        restaurant_id,
        name,
        description,
        price,
        category,
        image: cloudinaryResponse.url, // Store the URL of the image
        isAvailable,
        ingredients
      });
  
      await newMenuItem.save();
      res.status(201).json({ message: "Menu item created successfully", menuItem: newMenuItem });
    } catch (error) {
      res.status(500).json({ message: "Error: " + error.message });
    }
  };
  

// Get All Menu Items
const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); // Fetch all menu items from the database
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch menu items", error: error.message });
    }
};

// Get Single Menu Item by ID
const getSingleMenuItem = async (req, res) => {
    try {
        const { id }  = req.params;

        //console.log('In single menu');
        //console.log("Received Single Menu Item ID:", id); // Log the received id

        // Validate ObjectId
        if (!validateObjectId(id)) {
            return res.status(400).json({ message: "Invalid Menu Item ID" });
        }

        const menuItem = await MenuItem.findById(id);

        // Check if menu item exists
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

// Get Menu Item Details with Populated Restaurant Data
const getMenuItemDetails = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!validateObjectId(id)) {
            return res.status(400).json({ message: "Invalid Menu Item ID" });
        }

        // Fetch and populate the menu item with the associated restaurant data
        const menuItem = await MenuItem.findById(id).populate('restaurant_id');

        // Check if menu item exists
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

// Update Menu Item by ID
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, isAvailable, ingredients, restaurant_id } = req.body;

        // Validate ObjectId
        if (!validateObjectId(id)) {
            return res.status(400).json({ message: "Invalid Menu Item ID" });
        }

        let updateData = {
            restaurant_id,
            name,
            description,
            price,
            category,
            isAvailable,
            ingredients
        };

        // Update image if it's provided
        if (req.file) {
            const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
            updateData.image = cloudinaryResponse.url; // Add image URL to update data
        }

        const menuItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });

        // Check if menu item exists
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({
            message: "Menu item updated successfully",
            menuItem
        });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

// Delete Menu Item by ID
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!validateObjectId(id)) {
            return res.status(400).json({ message: "Invalid Menu Item ID" });
        }

        const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

        // Check if menu item exists
        if (!deletedMenuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        res.status(200).json({
            message: "Menu item deleted successfully",
            menuItem: deletedMenuItem
        });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

//search
const searchMenuItems = async (req, res) => {
    try {
        const query = req.query.query;  // Get search query from query string

        // If no query is provided, return a bad request response
        if (!query || query.trim() === "") {
            return res.status(400).json({ message: "Search query cannot be empty" });
        }

        // Search the menu items by name (case-insensitive)
        const items = await MenuItem.find({
            name: { $regex: query, $options: 'i' },  // Case-insensitive regex search
        });

        // If no items are found, return a 404 response
        if (items.length === 0) {
            return res.status(404).json({ message: "No menu items found matching your search" });
        }

        // Return the matching items
        res.status(200).json(items);
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ message: "Error fetching search results", error });
    }
};

// Controller to fetch menu items for the authenticated owner
const getMenuItemsByRestaurant = async (req, res) => {
    // Ensure you're correctly accessing the owner's ID
    const ownerId = req.restaurantOwner.id; // or req.user.id depending on your authentication setup

    console.log("Owner ID");
    console.log(ownerId);

    const { restaurantID } = req.params;

    console.log("restaurantID");
    console.log(restaurantID);
  
    // Validate the ownerId
    if (!mongoose.Types.ObjectId.isValid(ownerId)) {
      return res.status(400).json({ message: 'Invalid ownerId format' });
    }
  
    try {
      // Fetch menu items by owner_id
      const menuItems = await MenuItem.find({ restaurant_id: restaurantID });
  
      //console.log(menuItems);
  
      if (!menuItems || menuItems.length === 0) {
        return res.status(200).json({ message: 'No menu items found for this owner' });
      }
  
      res.status(200).json(menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ message: 'Server error while fetching menu items.' });
    }
  };
 
module.exports = {
    createMenuItems,
    getAllMenuItems,
    getSingleMenuItem,
    getMenuItemDetails,
    updateMenuItem,
    deleteMenuItem,
    searchMenuItems ,
    getMenuItemsByRestaurant
};
