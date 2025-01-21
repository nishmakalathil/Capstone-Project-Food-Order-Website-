
const express = require('express');

const userRouter = express.Router();

const userAuth  = require("../middlewares/userAuth.js");
const { userSignup, userLogin, userProfile ,userLogout,userUpdateProfile} = require('../controllers/userControllers.js');


//sign up
userRouter.post("/signup",userSignup);

//login
userRouter.put("/login",userLogin);

//profile
userRouter.get("/profile",userAuth,userProfile);

//logout

userRouter.put("/logout",userAuth,userLogout);

//userUpdateProfile
userRouter.put('/update', userAuth, userUpdateProfile);

module.exports = userRouter;