const Review = require("../Models/reviewModel.js");
const MenuItem = require("../Models/menuItemsModel.js");



const addReview = async (req, res) => {
    try {
        const { menuItemId, rating, comment, orderId } = req.body;
        const userId = req.user.id;

        // Validate if the menu exists
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu Item not found" });
        }

        if (rating > 5 || rating <= 1) {
            return res.status(400).json({ message: "Please provide a proper rating" });
        }

        // Create or update the review
        const review = await Review.findOneAndUpdate({ userId, menuItemId, orderId }, { rating, comment }, { new: true, upsert: true });

        // Optionally, you can update the course's average rating here

        res.status(201).json({ data: review, message: "review added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};


//Get menuitem review
 const getMenuItemReviews = async (req, res) => {
    try {
       
        const { orderId, menuItemId } = req.params;

        const reviews = await Review.findOne({ menuItemId, orderId })
            .populate("userId", "name");

        if (!reviews) {
            return res.status(404).json({ message: "No reviews found for this menuiitem" });
        }

        res.status(200).json({ data: reviews, message: "reviews fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

//Delete Review
const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;  // Extract reviewId from URL params
        const userId = req.user.id;  // Get the authenticated user's ID

        console.log("Attempting to delete review with ID:", reviewId);
        console.log("Authenticated user ID:", userId);

        // Find and delete the review by reviewId and userId (making sure the user is authorized)
        const review = await Review.findOneAndDelete({ _id: reviewId, userId });

        if (!review) {
            // If review is not found or the user is not authorized to delete it
            return res.status(404).json({ message: "Review not found or not authorized" });
        }

        // If the review is successfully deleted
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        console.error("Error while deleting review:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};


//Average Rating
const getAverageRating = async (req, res) => {
    try {
        const { menuItemId } = req.params;

        console.log("Fetching reviews for menuItemId:", menuItemId);  // Log menuItemId

        const reviews = await Review.find({ menuItemId });

        if (reviews.length === 0) {
            console.log("No reviews found for this menu item.");  // Log when no reviews are found
            return res.status(404).json({ message: "No reviews found for this menu item" });
        }

        // Calculate the average rating
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

        console.log("Calculated average rating:", averageRating);  // Log calculated average rating

        // Send the response with the average rating
        res.status(200).json({ data: averageRating, message: "Avg reviews fetched" });
    } catch (error) {
        console.error("Error in fetching average rating:", error);  // Log error details
        res.status(500).json({ message: "Internal server error", error });
    }
};

const getUserReviews = async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from authenticated request

        // Find all reviews written by this user
        const reviews = await Review.find({ userId }).populate("menuItemId", "name");

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this user." });
        }

        res.status(200).json({ data: reviews, message: "User reviews fetched successfully" });
    } catch (error) {
        console.error("Error fetching user reviews:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};



 
module.exports ={addReview,getMenuItemReviews,deleteReview,getAverageRating,getUserReviews }