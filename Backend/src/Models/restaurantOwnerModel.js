


const mongoose = require('mongoose');

// Restaurant Owner Schema
const restaurantOwnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, 
    role: { type: String, enum: ['restaurantOwner', 'admin'], default: 'restaurantOwner' }, 
    phoneNumber: { type: String, required: true },
    
    profilePic: { 
        type: String,
        default: 'https://tcap.pbworks.com/f/1435170280/myAvatar.png' 
    },

    approved: { type: Boolean, default: false }, // Approval status (Admin-controlled)

}, { timestamps: true }); // Adds createdAt & updatedAt fields

const RestaurantOwner = mongoose.model('RestaurantOwner', restaurantOwnerSchema);

module.exports = RestaurantOwner;
