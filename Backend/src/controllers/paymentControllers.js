const Order = require('../Models/orderModel');
const PaymentGateway = require('../utils/paymentGateway');  // Example of payment gateway integration

// Process payment for an order
const processPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body; // Get order ID and payment method from request

        // Step 1: Find the order
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Step 2: Process payment via payment gateway (e.g., Stripe, PayPal)
        const paymentResult = await PaymentGateway.processPayment(order.totalPrice, paymentMethod);

        if (paymentResult.success) {
            // Step 3: Update the order with payment status
            order.paymentStatus = 'Completed';  // Update status to 'Completed' after successful payment
            await order.save();

            res.status(200).json({ message: "Payment successful", order });
        } else {
            res.status(400).json({ message: "Payment failed", error: paymentResult.error });
        }
    } catch (error) {
        res.status(500).json({ message: "Error: " + error.message });
    }
};

module.exports = { processPayment };
