import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";
import { toast } from "react-hot-toast";

const LeaveReview = () => {
    const { id } = useParams();  // ✅ Get menu item ID from URL
    const navigate = useNavigate();
    const [menuItem, setMenuItem] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log("Reviewing menuItemId:", id); // ✅ Debugging

    // ✅ Fetch menu item details
    
    useEffect(() => {
        if (!id) {
            setError("Invalid menu item ID.");
            setLoading(false);
            return;
        }
    
        const fetchMenuItem = async () => {
            try {
                console.log("Fetching menu item details...");
                console.log("API Request URL:", `/menu-items/get-single/${id}`); // ✅ Debugging
    
                const response = await axiosInstance.get(`/menu-items/get-single/${id}`);
    
                if (!response.data || !response.data.data) {
                    throw new Error("Menu item not found");
                }
    
                setMenuItem(response.data.data);
                console.log("Fetched menu item:", response.data.data);
            } catch (err) {
                setError("Failed to load menu item details.");
                console.error("Error fetching menu item:", err);
            } finally {
                setLoading(false);
            }
        };
    
        fetchMenuItem();
    }, [id]);
    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!id) {
            toast.error("Invalid menu item ID.", { position: "top-center" });
            return;
        }

        try {
            console.log("Submitting review...", { menuItemId: id, rating, comment: review });

            await axiosInstance.post(`/review/add-review`, {
                menuItemId: id,  // ✅ Use `id` from `useParams()`
                rating,
                comment: review,
            });

            toast.success("Review submitted successfully!", { position: "top-center" });
            navigate("/user/order-display"); // ✅ Redirect to orders page
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to submit review.", { position: "top-center" });
            console.error("Review submission error:", err);
        }
    };

    if (loading) return <p className="text-center">Loading menu item details...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-semibold text-center mb-4">Leave a Review</h1>

                {menuItem ? (
                    <div className="text-center mb-4">
                        <img
                            src={menuItem.image || "https://via.placeholder.com/150"}
                            alt={menuItem.name}
                            className="w-24 h-24 mx-auto rounded-lg object-cover"
                        />
                        <h2 className="font-bold text-lg mt-2">{menuItem.name}</h2>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Menu item details not available.</p>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Rating:</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="w-full p-2 border rounded"
                        >
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>
                                    {num} ⭐
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Your Review:</label>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Submit Review
                    </button>
                </form>

                {/* ✅ Back Button */}
                <button
                    onClick={() => navigate("/user/order-display")}
                    className="w-full bg-gray-400 text-white py-2 mt-4 rounded hover:bg-gray-500"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default LeaveReview;
