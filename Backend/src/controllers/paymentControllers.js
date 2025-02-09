const Payment = require('../models/Payment'); // Import the Payment model
const Order = require('../models/Order'); // Import the Order model
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // If using Stripe or any other payment gateway

// Create Payment (after order checkout)
const createPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod, amount } = req.body;
        const userId = req.user.id;  // Assuming you have the authenticated user ID in req.user

        // 1. Fetch the order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // 2. Check if the payment amount is correct (for example)
        if (amount !== order.totalPrice) {
            return res.status(400).json({ message: 'Payment amount does not match order total' });
        }

        // 3. Process the payment (e.g., using Stripe)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,  // Convert to cents if you're using Stripe
            currency: 'usd',
            payment_method: paymentMethod,  // Payment method ID received from the client
            confirm: true,
        });

        // 4. If payment is successful, create a new payment document in the database
        if (paymentIntent.status === 'succeeded') {
            const payment = new Payment({
                userId,
                orderId,
                paymentMethod,
                paymentStatus: 'Completed',
                transactionId: paymentIntent.id,
                amount,
                currency: 'usd',
            });

            // Save payment to the database
            await payment.save();

            // Return success response with payment and order details
            res.status(200).json({
                message: 'Payment successful',
                payment,
                order,
            });
        } else {
            res.status(400).json({ message: 'Payment failed', paymentIntent });
        }
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ message: 'Error processing payment', error });
    }
};

// Get payment details by order ID
const getPaymentDetails = async (req, res) => {
    try {
        const { orderId } = req.params;  // Get the order ID from the request parameters

        // 1. Find the payment associated with this order
        const payment = await Payment.findOne({ orderId }).populate('userId orderId');
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found for this order' });
        }

        // 2. Return the payment details
        res.status(200).json({
            message: 'Payment details retrieved successfully',
            payment,
        });
    } catch (error) {
        console.error('Error fetching payment details:', error);
        res.status(500).json({ message: 'Error retrieving payment details', error });
    }
};

// Update Payment Status (if required, for example if a refund was processed)
const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentId, status } = req.body;  // Payment ID and the new status (e.g., 'Refunded')
        
        // 1. Find the payment by ID and update its status
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        // 2. Update the payment status
        payment.paymentStatus = status;
        await payment.save();

        // 3. Return the updated payment details
        res.status(200).json({
            message: 'Payment status updated successfully',
            payment,
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({ message: 'Error updating payment status', error });
    }
};

module.exports = {
    createPayment,
    getPaymentDetails,
    updatePaymentStatus,
};
