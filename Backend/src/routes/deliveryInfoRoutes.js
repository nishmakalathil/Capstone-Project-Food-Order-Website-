const express = require('express');
const deliveryInfoRouter = express.Router();
const  saveDeliveryInfo  = require('../controllers/deliveryInfoControllers.js');
const userAuth  = require("../middlewares/userAuth.js");

// Route to save or update delivery information for a pending order

deliveryInfoRouter.post('/save',userAuth , saveDeliveryInfo);




module.exports = deliveryInfoRouter;