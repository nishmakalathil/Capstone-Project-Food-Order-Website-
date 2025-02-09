const express = require('express');
const deliveryInfoRouter = express.Router();
const  {saveDeliveryInfo,updateDeliveryInfo,getAllDeliveryInfo,deleteDeliveryInfo}  = require('../controllers/deliveryInfoControllers.js');
const userAuth  = require("../middlewares/userAuth.js");

// Add a new address
deliveryInfoRouter.post('/save',userAuth, saveDeliveryInfo);

// Update an existing address
deliveryInfoRouter.put('/update',userAuth, updateDeliveryInfo);


// Route to get all delivery addresses for the authenticated user
deliveryInfoRouter.get('/getAll', userAuth , getAllDeliveryInfo);



// Delete a specific address
deliveryInfoRouter.delete('/delete/:addressId', userAuth, deleteDeliveryInfo);

module.exports = deliveryInfoRouter;
