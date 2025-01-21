const express = require('express');
const apiRouter = express.Router();

const userRouter = require('./userRoutes.js');
const restaurantOwnerRouter = require('./restaurantOwnerRoutes.js');


apiRouter.use('/user',userRouter);
apiRouter.use('/restaurantOwner',restaurantOwnerRouter);

module.exports = apiRouter;