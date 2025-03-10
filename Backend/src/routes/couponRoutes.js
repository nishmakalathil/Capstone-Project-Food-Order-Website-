const express = require("express");

const couponRouter = express.Router();

const {  getCoupons, validateCoupon } = require('../controllers/couponController.js');

// Routes

couponRouter.get("/get-available", getCoupons); // Get all coupons
couponRouter.post("/validate", validateCoupon); // Validate and apply coupon


module.exports = couponRouter;
