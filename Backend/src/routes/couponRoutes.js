const express = require("express");

const couponRouter = express.Router();

const { createCoupon, getCoupons, validateCoupon ,deleteCoupon} = require('../controllers/couponController.js');

// Routes
couponRouter.post("/create", createCoupon); // Create a coupon
couponRouter.get("/", getCoupons); // Get all coupons
couponRouter.post("/validate", validateCoupon); // Validate and apply coupon
couponRouter.delete("/:id", deleteCoupon); // Delete a coupon

module.exports = couponRouter;
