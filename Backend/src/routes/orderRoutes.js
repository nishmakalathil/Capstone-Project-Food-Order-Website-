const express = require("express");
const orderRouter = express.Router();
const {getOrderSummary,placeOrder}= require("../controllers/orderControllers.js");

const userAuth  = require("../middlewares/userAuth.js");

//Order Summary

orderRouter.get('/order-summary', userAuth, getOrderSummary);


//placed order

orderRouter.post('/place-order', userAuth, placeOrder);


module.exports = orderRouter;