const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expirationDate: { type: Date, required: true }, // Expiry date
  createdAt: { type: Date, default: Date.now },
});

const Coupon = mongoose.model('Coupon', CouponSchema);
module.exports = Coupon;
