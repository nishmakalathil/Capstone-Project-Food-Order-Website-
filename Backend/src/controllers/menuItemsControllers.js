const MenuItem = require("../Models/menuItemsModel.js");
const cloudinaryInstance = require('../config/cloudinaryConfig.js');
const multer = require('multer');
const Restaurants = require("../Models/restaurantsModel.js")


// Create Menu Item
const createMenuItems = async (req, res) => {
    try {
        const { name, description, price, category, isAvailable, ingredients,restaurant_id } = req.body;

        if (!name || !description || !price || !category || !restaurant_id) {
            return res.status(400).json({ message: "All fields are required" });
        }
          
        // Ensure file is present in the request
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        // Upload image to Cloudinary
        const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
            
        // Create a new MenuItem
        const newMenuItem = new MenuItem({
            restaurant_id,
            name,
            description,
            price,
            category,
            image: cloudinaryResponse.url,  // Store the secure URL from Cloudinary
            isAvailable,
            ingredients
        });

        await newMenuItem.save();
        res.status(201).json({
            message: "Menu item created successfully",
            menuItem: newMenuItem
        });
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};



// Get all Menu Items
const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find(); // Fetches all menu items from the database
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch menu items", error: error.message });
    }
};




// Correct usage within an async function
const getSingleMenuItem = async (req, res) => {
  try {
      const { id } = req.params; // Get the ID from the URL parameter

      // Ensure await is used within async function
      const menuItem = await MenuItem.findById(id);

      if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found" });
      }

      res.status(200).json(menuItem);
  } catch (error) {
      res.status(500).json({ message: "Error: " + error.message });
  }
};



// Get detailed Menu Item information by ID
const getMenuItemDetails = async (req, res) => {
  try {
      const { id } = req.params; // Get the ID from the URL parameter

      // Find the menu item by its ID in the database
      const menuItem = await MenuItem.findById(id).populate('restaurant_id'); // You can populate related fields if needed

      // If the menu item is not found, send a 404 error
      if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found" });
      }

      // Send a success response with detailed information about the menu item
      res.status(200).json(menuItem);
  } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: "Error: " + error.message });
  }
};









// Update a menu item by ID
const updateMenuItem = async (req, res) => {
  try {
      const { id } = req.params; // Get the ID from the URL parameter
      const { name, description, price, category, isAvailable, ingredients, restaurant_id } = req.body; // Get fields from the request body
      
      // Initialize the update data object
      let updateData = {
          restaurant_id,
          name,
          description,
          price,
          category,
          isAvailable,
          ingredients
      };

      // If there's an image uploaded in the request, upload it to Cloudinary
      if (req.file) {
          const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path); // Upload image to Cloudinary
          updateData.image = cloudinaryResponse.secure_url; // Store the secure URL from Cloudinary in the image field
      }

      // Update the menu item in the database
      const menuItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true }); // Update the item and return the updated item

      // If the menu item doesn't exist, send a 404 error
      if (!menuItem) {
          return res.status(404).json({ message: "Menu item not found" });
      }

      // Send a success response with the updated menu item
      res.status(200).json({
          message: "Menu item updated successfully",
          menuItem
      });
  } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: "Error: " + error.message });
  }
};


//delete


// Delete a menu item by ID
const deleteMenuItem = async (req, res) => {
  try {
      const { id } = req.params; // Get the ID from the URL parameter

      // Find the menu item by ID and delete it
      const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

      // If the menu item is not found, return a 404 error
      if (!deletedMenuItem) {
          return res.status(404).json({ message: "Menu item not found" });
      }

      // Send a success response after deleting the menu item
      res.status(200).json({
          message: "Menu item deleted successfully",
          menuItem: deletedMenuItem
      });
  } catch (error) {
      // Handle any errors that occur
      res.status(500).json({ message: "Error: " + error.message });
  }
};









module.exports = {createMenuItems,getAllMenuItems,getSingleMenuItem,getMenuItemDetails,deleteMenuItem, updateMenuItem};
