
const Order = require('../Models/orderModel.js');
const Cart = require('../Models/cartModel.js');

const createOrder = async (req, res) => {
  try {
    // Extract user data and cart details from the request
    const userId = req.user.id;
    const { deliveryInfo, couponCode, discount } = req.body;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(400).json({ message: 'Cart not found for this user.' });
    }

    // Calculate delivery charges (example: fixed amount or based on cart value)
    const deliveryCharges = cart.totalPrice > 50 ? 0 : 5;  // Example logic

    // Create a new order object
    const order = new Order({
      userId,
      cart: {
        menuItems: cart.menuItems,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
        couponCode: couponCode || '',  // If couponCode exists, it will be used
      },
      deliveryInfo: {
        deliveryAddress: deliveryInfo.deliveryAddress,
        deliveryTime: deliveryInfo.deliveryTime,
        contactNumber: deliveryInfo.contactNumber,
        deliveryInstructions: deliveryInfo.deliveryInstructions || '',
      },
      deliveryCharges,  // Add delivery charges here
    });

    // Apply the coupon if it's available
    if (couponCode && discount) {
      // Assuming discount is a percentage
      order.totalAmount = order.cart.totalPrice - (order.cart.totalPrice * (discount / 100)) + deliveryCharges;
    } else {
      order.totalAmount = order.cart.totalPrice + deliveryCharges;
    }

    // Save the order
    await order.save();

    // Optionally clear the cart after placing the order
    await Cart.deleteOne({ userId });

    // Send the response
    return res.status(201).json({ message: 'Order created successfully!', order });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error. Could not create order.' });
  }
};




// Get orders for the logged-in user
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // Get the authenticated user ID from `req.user`

    // Fetch orders for the logged-in user
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Could not retrieve orders.' });
  }
};









module.exports = { createOrder, getUserOrders};












