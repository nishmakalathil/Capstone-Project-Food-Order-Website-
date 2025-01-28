const mongoose = require('mongoose');
const MenuItem =  require('./menuItemsModel.js');
const User = require('./userModel.js'); 

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    menuItemId: {
        type: mongoose.Types.ObjectId,
        ref: "MenuItem",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


const Review = mongoose.model('Review',reviewSchema );


module.exports = Review;