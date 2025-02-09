const mongoose = require('mongoose');

// Payment Schema
const paymentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    orderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order', 
        required: true 
    },
    paymentMethod: { 
        type: String, 
        required: true  // e.g., 'Credit Card', 'PayPal', etc.
    },
    paymentStatus: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending',
        required: true
    },
    transactionId: { 
        type: String, 
        required: true  // Store the transaction ID from the payment gateway (e.g., Stripe transaction ID)
    },
    amount: { 
        type: Number, 
        required: true  // The total amount of the transaction in the smallest unit (e.g., cents)
    },
    currency: { 
        type: String, 
        default: 'usd'  // Default currency is USD, adjust as necessary
    },
    createdAt: { 
        type: Date, 
        default: Date.now
    }
});

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
