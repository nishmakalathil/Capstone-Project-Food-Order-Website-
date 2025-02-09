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

        // Ensure all required fields are provided
        if (!name || !description || !price || !category || !restaurant_id || !ingredients) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Ensure image is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);

        // Create the new menu item
        const newMenuItem = new MenuItem({
            restaurant_id,
            name,
            description,
            price,
            category,
            image: cloudinaryResponse.url,
            isAvailable,
            ingredients
        });

        // Save the menu item
        await newMenuItem.save();
        res.status(201).json({
            message: "Menu item created successfully",
            menuItem: newMenuItem
        });
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

        console.log('In single menu');
        console.log("Received Single Menu Item ID:", id); // Log the received id

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

module.exports = {
    createMenuItems,
    getAllMenuItems,
    getSingleMenuItem,
    getMenuItemDetails,
    updateMenuItem,
    deleteMenuItem
};
