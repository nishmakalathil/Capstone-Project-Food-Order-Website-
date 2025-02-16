const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expiresAt: { type: Date },                  // Expiry date for the coupon
  usageLimit: { type: Number },               // Limit of how many times a coupon can be used
  isPercentage: { type: Boolean, default: false }, // Whether it's a fixed amount or percentage discount
  applicableItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }] // Optional: menu items this coupon applies to
});

const Coupon = mongoose.model('Coupon', CouponSchema);
module.exports = Coupon;
