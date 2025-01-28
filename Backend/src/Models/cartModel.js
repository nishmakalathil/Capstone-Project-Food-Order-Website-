const mongoose = require('mongoose');
const User = require('./userModel.js'); 
const MenuItem = require('./menuItemsModel.js');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User", // Referring to the "User" model
        required: true,
    },
    menuItems: [
        {
            menuItemId: {
                type: mongoose.Schema.Types.ObjectId, // Use mongoose.Schema.Types.ObjectId
                ref: "MenuItem", // Referring to the "MenuItem" model
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
    coupon: { 
        code: String,
        discount: Number // or other relevant info
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Cancelled'],
        default: 'Pending',
    },
}, { timestamps: true });

// Method to calculate the total price of the cart
cartSchema.methods.calculateTotalPrice = function () {
    this.totalPrice = this.menuItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
};

// Create and export Cart model
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
