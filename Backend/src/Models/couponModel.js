const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
});

const Coupon = mongoose.model('Coupon', CouponSchema);
module.exports = Coupon;
