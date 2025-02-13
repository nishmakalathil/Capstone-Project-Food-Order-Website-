const express = require("express");
const orderRouter = express.Router();
const createOrder= require("../controllers/orderControllers.js");

const userAuth  = require("../middlewares/userAuth.js");





// Route to create a new order
orderRouter.post('/create-order',userAuth , createOrder);













module.exports = orderRouter;