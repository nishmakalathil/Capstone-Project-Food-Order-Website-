const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentControllers.js');

// Create a payment (after checkout)
router.post('/create', paymentController.createPayment);

// Get payment details by order ID
router.get('/:orderId', paymentController.getPaymentDetails);

// Update payment status (e.g., for refunds)
router.put('/update-status', paymentController.updatePaymentStatus);

module.exports = router;
