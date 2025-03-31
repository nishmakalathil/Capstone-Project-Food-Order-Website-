import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";

const LeaveReview = () => {
    const { orderId, menuItemId  } = useParams();
    const navigate = useNavigate();
    const [menuItem, setMenuItem] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);
    const [existingReview, setExistingReview] = useState(null);
    
    useEffect(() => {
        if (!menuItemId) {
            setError("Menu item ID is missing.");
            return;
        }
        
        const fetchMenuItem = async () => {
            try {
                const response = await axiosInstance.get(`/menu-items/get-single/${menuItemId}`);
                setMenuItem(response.data);
            } catch (error) {
                setError("Failed to load menu item details.");
                console.error("Error fetching menu item:", error);
            }
        };

        const fetchReview = async () => {
            try {
                const response = await axiosInstance.get(`/review/get-menu-reviews/${orderId}/${menuItemId}`);
                console.log(response.data.data);
                if (response.data.data) {
                    setExistingReview(response.data.data);
                    setRating(response.data.data.rating);
                    setComment(response.data.data.comment);
                }
            } catch (error) {
                console.error("No existing review found or failed to fetch review:", error);
            }
        };
        
        fetchMenuItem();
        fetchReview();
    }, [menuItemId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!menuItemId) {
            setError("Menu item ID is missing.");
            return;
        }
        try {
            const reviewData = { menuItemId, rating, comment, orderId };

            await axiosInstance.post("/review/add-review", reviewData);
            
            navigate("/user/order-display");
        } catch (error) {
            setError("Failed to submit review. Please try again.");
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-semibold text-center mb-4">{existingReview ? "Update Your Review" : "Leave a Review"}</h1>
                {error && <p className="text-center text-red-500">{error}</p>}
                {menuItem ? (
                    <>
                        <h2 className="text-lg font-bold">{menuItem.name}</h2>
                        <img
                            src={menuItem.image || "https://via.placeholder.com/100"}
                            alt={menuItem.name}
                            className="w-24 h-24 mx-auto my-2 rounded-lg"
                        />
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <label>
                                Rating (1-5):
                                <input
                                    type="number"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    min="1"
                                    max="5"
                                    className="w-full p-2 border rounded"
                                />
                            </label>
                            <label>
                                Comment:
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full p-2 border rounded"
                                    rows="3"
                                />
                            </label>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                {existingReview ? "Update Review" : "Submit Review"}
                            </button>
                        </form>
                    </>
                ) : (
                    <p className="text-center">Loading menu item details...</p>
                )}
                <button
                    onClick={() => navigate("/user/order-display")}
                    className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LeaveReview;
