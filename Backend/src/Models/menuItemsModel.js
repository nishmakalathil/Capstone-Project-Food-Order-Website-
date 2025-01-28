
const mongoose = require('mongoose');
const Restaurants = require("../Models/restaurantsModel.js");


// Define the MenuItem Schema
const menuItemsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      enum: ['soup', 'Burger', 'Pasta', 'Beverages', 'Sides', 'Desserts','Biriyani'], // Example categories
      trim: true
    },
    image: {
      type: String, // URL or path to image
      default: ''
    },
    restaurant_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'restaurants'
        },

    isAvailable: {
      type: Boolean,
      default: true
    },
    // Additional fields, such as ingredients or nutritional info
    ingredients: {
      type: [String], // Array of ingredients, e.g., ['cheese', 'tomato', 'pepperoni']
      default: []
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Automatically manage createdAt and updatedAt
  }
);

// Create a model based on the schema
const MenuItem = mongoose.model('MenuItem', menuItemsSchema);

module.exports = MenuItem;


