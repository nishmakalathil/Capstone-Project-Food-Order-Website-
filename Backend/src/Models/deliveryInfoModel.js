const mongoose = require('mongoose');
const Order = require("./orderModel.js"); // Correct path to the Order model
const User = require("./userModel.js"); 

// Delivery Information Schema
const deliveryInfoSchema = new mongoose.Schema({
    

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
        
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryTime: {
        type: Date,  // Delivery time (either a timestamp or datetime)
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    deliveryInstructions: {
        type: String,
        default: ""  // Optional instructions like "Leave at the door"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const DeliveryInfo = mongoose.model('DeliveryInfo', deliveryInfoSchema);
module.exports = DeliveryInfo;
