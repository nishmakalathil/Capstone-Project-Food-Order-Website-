const mongoose = require('mongoose');

// Cart Schema
const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menuItems: [{
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String },
  }],
  totalPrice: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },
  status: { type: String, default: 'Pending' },
});

// Calculate total price and quantity of the cart
CartSchema.methods.calculateTotalPrice = function() {
  let total = 0;
  let quantity = 0;

  this.menuItems.forEach(item => {
    total += item.price * item.quantity;
    quantity += item.quantity;
  });

  this.totalPrice = total;
  this.totalQuantity = quantity;
};

// Apply a coupon
CartSchema.methods.applyCoupon = function(couponCode, discount) {
  if (couponCode === 'VALID_COUPON') {  // Example logic for valid coupon
    this.totalPrice -= discount;
  }
};

const Cart = mongoose.model('Cart', CartSchema);
module.exports = Cart;
