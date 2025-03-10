const Coupon = require("../Models/couponModel");



// Get all coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({ coupons });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Validate and apply coupon
const validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;
    
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ error: "Invalid coupon code" });
    }

    // Calculate discount
    const discountValue = coupon.discount;
    const finalAmount = orderAmount - discountValue;

    res.json({
      message: "Coupon applied successfully",
      discount: discountValue,
      finalAmount: finalAmount > 0 ? finalAmount : 0,
      couponCode: code
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getCoupons,validateCoupon};
