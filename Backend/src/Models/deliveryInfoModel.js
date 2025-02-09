
const mongoose = require('mongoose');

// Delivery Information Schema (with addresses as an array)
const deliveryInfoSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    addresses: [  // Use an array of objects for storing multiple addresses
        {
            deliveryAddress: { type: String, required: true },
            deliveryTime: { type: Date, required: true },
            contactNumber: { type: String, required: true },
            deliveryInstructions: { type: String, default: "" },
        }
    ],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const DeliveryInfo = mongoose.model('DeliveryInfo', deliveryInfoSchema);
module.exports = DeliveryInfo;
