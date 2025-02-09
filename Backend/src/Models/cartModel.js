const mongoose = require('mongoose');
const User = require('./userModel.js');
const MenuItem = require('./menuItemsModel.js');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    menuItems: [
      {
        menuItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MenuItem',
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
        image: {
          type: String,  // Store the URL or path to the image
          required: false, // It's optional for some cases
        },
      },
    ],
    coupon: {
      code: { type: String },
      discount: { type: Number }, // Discount in percentage (0-100)
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

// Method to calculate the total price and total quantity
cartSchema.methods.calculateTotalPrice = function () {
  let subtotal = this.menuItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  // Apply coupon discount if any
  if (this.coupon && this.coupon.discount) {
    const discountAmount = (this.coupon.discount / 100) * subtotal;
    subtotal -= discountAmount;
  }
  
  this.totalPrice = subtotal;
  this.totalQuantity = this.menuItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
};

// Method to apply a coupon
cartSchema.methods.applyCoupon = function (couponCode, discount) {
  this.coupon = {
    code: couponCode,
    discount: discount, // Discount in percentage (0-100)
  };
  this.calculateTotalPrice();
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
