const Coupon = require("../Models/couponModel");

// Create a new coupon
const createCoupon = async (req, res) => {
  try {
    const { code, discount } = req.body;

    // Check if coupon already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ error: "Coupon code already exists" });
    }

    const coupon = new Coupon({ code, discount });
    await coupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
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

// Delete a coupon
const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createCoupon,getCoupons,validateCoupon,deleteCoupon};
