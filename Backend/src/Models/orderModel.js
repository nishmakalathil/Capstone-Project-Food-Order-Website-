const mongoose = require('mongoose');
const User = require('./userModel.js');           
const Restaurants = require('./restaurantsModel.js'); 
const MenuItem = require('./menuItemsModel.js');    
const DeliveryInfo = require('./deliveryInfoModel.js')

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
    menuItems: [
        {
            menuItemId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'MenuItem' 
            },
            quantity: { 
                type: Number, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            }
        }
    ],

    deliveryCharges: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },
    
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'],
        default: 'Pending'
    },

   
    deliveryInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryInfo'
    },

    coupon: { 
        code: String, 
        discount: Number 
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
