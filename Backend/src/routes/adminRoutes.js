const express = require("express");
const adminRouter = express.Router();
const { checkAdminAuth, getDashboardStats, logoutAdmin,getUsers,deactivateUser,getRestaurantOwners,getAllOrders, getMenuItems, createCoupon, deleteUnusedCoupon} = require("../controllers/adminControllers.js");

const adminAuth = require('../middlewares/adminAuth');
const restaurantOwnerAuth = require('../middlewares/restaurantOwnerAuth');
//check admin
adminRouter.get("/check-admin", checkAdminAuth);

adminRouter.get("/dashboard-stats", getDashboardStats);

//logout
adminRouter.post("/logout", logoutAdmin);

//get users
adminRouter.get("/get-users", restaurantOwnerAuth, adminAuth, getUsers);

//update user
adminRouter.patch("/deactivate-user/:id", restaurantOwnerAuth, adminAuth, deactivateUser);

// Get all restaurant owners
adminRouter.get("/get-restaurant-owners", getRestaurantOwners);

//get orders
adminRouter.get("/get-orders", getAllOrders);

//get MenuItems
adminRouter.get('/get-menu-items', getMenuItems);

// Admin routes for coupons
adminRouter.post("/create-coupon", createCoupon);

adminRouter.delete("/delete-coupon/:couponCode", deleteUnusedCoupon);

module.exports = adminRouter;
