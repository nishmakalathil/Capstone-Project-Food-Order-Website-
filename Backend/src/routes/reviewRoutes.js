const express = require('express');
const reviewRouter = express.Router();
const userAuth  = require("../middlewares/userAuth.js");

const{addReview,getMenuItemReviews, deleteReview ,getAverageRating,getUserReviews} = require('../controllers/reviewControllers.js');

//Add Review

reviewRouter.post("/add-review", userAuth, addReview);


//Get Reviews
reviewRouter.get("/get-menu-reviews/:orderId/:menuItemId", getMenuItemReviews);

//Delete Review
reviewRouter.delete('/delete-review/:reviewId', userAuth, deleteReview);


//Get Average Rating
reviewRouter.get("/get-average-rating/:menuItemId", getAverageRating);


// Get all reviews for the logged-in user
reviewRouter.get("/get-user-reviews",userAuth , getUserReviews);


module.exports = reviewRouter;
