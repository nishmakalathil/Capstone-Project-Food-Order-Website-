// routes/paymentRoutes.js

// routes/paymentRoutes.js

const express = require('express');
const paymentRouter = express.Router();
const  createCheckoutSession  = require('../controllers/paymentController.js');

const userAuth = require("../middlewares/userAuth.js");

paymentRouter.post('/create-checkout-session',userAuth, createCheckoutSession);

module.exports = paymentRouter;
