const express = require("express");
const orderRouter = express.Router();
const {createOrder,getUserOrders}= require("../controllers/orderControllers.js");


const userAuth  = require("../middlewares/userAuth.js");





// Route to create a new order
orderRouter.post('/create-order',userAuth , createOrder);

//get orders

orderRouter.get('/get-orders', userAuth, getUserOrders);










module.exports = orderRouter;