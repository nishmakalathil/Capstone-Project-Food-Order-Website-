// routes/paymentRoutes.js

// routes/paymentRoutes.js

const express = require('express');
const paymentRouter = express.Router();
const  {createCheckoutSession,sessionStatus}  = require('../controllers/paymentControllers.js');

const userAuth = require("../middlewares/userAuth.js");

paymentRouter.post('/create-checkout-session',userAuth, createCheckoutSession);

paymentRouter.get("/session-status",sessionStatus)

module.exports = paymentRouter;
