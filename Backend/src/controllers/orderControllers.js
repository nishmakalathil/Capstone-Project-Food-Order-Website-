const Cart = require('../Models/cartModel.js');
const Order = require("../Models/orderModel.js");
const DeliveryInfo = require('../Models/deliveryInfoModel.js');

// getOrderSummary
const getOrderSummary = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated user

        if (!userId) {
            return res.status(400).json({ message: "User ID is missing or not authenticated." });
        }

        // Fetch the user's cart and include item details
        const cart = await Cart.findOne({ userId }).populate('menuItems.menuItemId');

        if (!cart) {
            return res.status(404).json({ message: "Cart not found." });
        }

        // Fetch the delivery info for the user
        const deliveryInfo = await DeliveryInfo.findOne({ userId });

        if (!deliveryInfo) {
            return res.status(404).json({ message: "Delivery information not found." });
        }

        // Calculate total price dynamically
        let totalPrice = 0;
        cart.menuItems.forEach(item => {
            if (item.menuItemId && item.menuItemId.price) {
                totalPrice += item.menuItemId.price * item.quantity;  // Add the price of each item
            }
        });

        // Add delivery charges (can be static or dynamic)
        let deliveryCharges = cart.deliveryCharges || 0; // Default to 0 if not set

        // Apply coupon discount if any
        let coupon = cart.coupon || null;
        if (coupon && coupon.discount) {
            totalPrice -= coupon.discount; // Subtract coupon discount from total price
        }

        // Return order summary with cart and delivery info
        res.status(200).json({
            message: "Order summary retrieved successfully",
            cart: cart,
            deliveryInfo: deliveryInfo,
            totalPrice: totalPrice,
            deliveryCharges: deliveryCharges,
            coupon: coupon
        });

    } catch (error) {
        console.error('Error retrieving order summary:', error);
        res.status(500).json({ message: "Error retrieving order summary", error });
    }
};

module.exports = getOrderSummary;
