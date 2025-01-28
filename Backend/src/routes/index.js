const express = require('express');
const apiRouter = express.Router();

const userRouter = require('./userRoutes.js');
const restaurantOwnerRouter = require('./restaurantOwnerRoutes.js');
const menuItemsRouter = require('./menuItemsRoutes.js');
const restaurantsRouter = require('./restaurantsRoutes.js');
const cartRouter = require('./cartRoutes.js'); 
const reviewRouter = require('./reviewRoutes.js'); 
const orderRouter = require('./orderRoutes.js'); 
const deliveryInfoRouter = require('./deliveryInfoRoutes.js'); 

apiRouter.use('/user',userRouter);
apiRouter.use('/restaurantOwner',restaurantOwnerRouter);
apiRouter.use('/menu-items',menuItemsRouter);
apiRouter.use('/restaurants',restaurantsRouter);
apiRouter.use('/cart',cartRouter);
apiRouter.use('/review',reviewRouter);
apiRouter.use('/order',orderRouter);
apiRouter.use('/deliveryInfo',deliveryInfoRouter);






module.exports = apiRouter;