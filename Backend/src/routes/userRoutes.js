
const express = require('express');

const userRouter = express.Router();

const userAuth  = require("../middlewares/userAuth.js");
const { userSignup, userLogin, userProfile ,userLogout,userUpdateProfile,checkUser} = require('../controllers/userControllers.js');


//sign up
userRouter.post("/signup",userSignup);

//login
userRouter.post("/login",userLogin);

//profile
userRouter.get("/profile",userAuth,userProfile);

//logout

userRouter.post("/logout",userAuth,userLogout);

//userUpdateProfile
userRouter.put('/update', userAuth, userUpdateProfile);

//checkuser
userRouter.get("/check-user", userAuth, checkUser);

module.exports = userRouter;