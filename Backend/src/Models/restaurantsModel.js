const mongoose = require('mongoose');

const restaurantsSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'restaurantOwner'
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    address: { 
      type: String, 
      required: true 
    },
    phone_number: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String, // URL or path to image
      default: ''
    },

    
    
    delivery_hours: {
        type: [String], // If you have a specific schema for this, you can define it similarly
      required: true
    },
    delivery_areas: [
      {
        type: [String],
        required: true
      }
    ],
    average_delivery_time: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    updated_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Automatically handle created_at and updated_at
  }
);

// Create the Restaurant model
const Restaurants = mongoose.model('Restaurants', restaurantsSchema);

module.exports = Restaurants;
