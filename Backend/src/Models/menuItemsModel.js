
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
      enum: ['soup', 'Burger', 'Pasta', 'Beverages', 'Sides', 'Desserts','Biriyani'], 
      trim: true
    },
    image: {
      type: String, 
      default: ''
    },
    restaurant_id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Restaurants'
        },

    isAvailable: {
      type: Boolean,
      default: true
    },
   
    ingredients: {
      type: [String], 
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
    timestamps: true 
  }
);


const MenuItem = mongoose.model('MenuItem', menuItemsSchema);

module.exports = MenuItem;


