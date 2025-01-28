const Cart = require('../Models/cartModel.js');
const Order = require("../Models/orderModel.js");
const DeliveryInfo = require('../Models/deliveryInfoModel.js');


//getordersummary

const getOrderSummary = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated user

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
            totalPrice += item.price * item.quantity;  // Add the price of each item
        });

        // Add delivery charges (can be static or dynamic)
        let deliveryCharges = cart.deliveryCharges;

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
//place order

const placeOrder = async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from authenticated user

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
            totalPrice += item.price * item.quantity;  // Add the price of each item
        });

        // Calculate delivery charges
        let deliveryCharges = 50; // Default static delivery charge
        if (cart.totalPrice >= 500) {
            deliveryCharges = 0; // Free delivery if the total price is over 500
        }

        // Apply coupon discount if any
        let coupon = cart.coupon || null;
        if (coupon && coupon.discount) {
            totalPrice -= coupon.discount; // Subtract coupon discount from total price
        }

        // Calculate final total price including delivery charges
        totalPrice += deliveryCharges;

        // Create a new order based on the cart and delivery info
        const newOrder = new Order({
            userId,
            restaurantId: cart.restaurantId,
            menuItems: cart.menuItems,
            totalPrice: totalPrice,
            deliveryCharges: deliveryCharges,
            status: 'Pending',  // Set the order status to 'Pending'
            deliveryInfo: deliveryInfo._id, // Link to the delivery information
            coupon: coupon // Save the coupon details
        });

        // Save the new order to the database
        await newOrder.save();

        // Return success response with the newly created order details
        res.status(200).json({
            message: "Order placed successfully",
            order: newOrder
        });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: "Error placing order", error });
    }
};












module.exports = {getOrderSummary, placeOrder};
