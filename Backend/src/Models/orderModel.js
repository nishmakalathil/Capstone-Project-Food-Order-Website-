const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: {
      type: String,
      required: true,
    },
    cart: {
      menuItems: [
        {
          menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
          quantity: { type: Number },
          price: { type: Number },
          image: { type: String },
          name: { type: String },
        }
      ],
      totalPrice: { type: Number },
      totalQuantity: { type: Number },
      couponCode: { type: String },
    },
    deliveryInfo: {
      deliveryAddress: { type: String },
      deliveryTime: { type: String },
      contactNumber: { type: String },
      deliveryInstructions: { type: String, default: '' },
    },
    deliveryCharges: { type: Number }, // Delivery charges included here
    totalAmount: { type: Number }, // Total amount after applying delivery charges, coupon, etc.
    reviewed: { type: Boolean, default: false }, // ✅ Added review field (default: false)
  },
  { timestamps: true } // ✅ Automatically adds createdAt (Order Date) & updatedAt
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
