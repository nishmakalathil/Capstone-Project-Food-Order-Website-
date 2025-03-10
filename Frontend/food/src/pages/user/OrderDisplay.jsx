import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";

const OrderDisplay = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                const response = await axiosInstance.get("/order/get-orders");

                // Ensure `orders` exists and is an array
                setOrders(Array.isArray(response.data.orders) ? response.data.orders : []);
            } catch (error) {
                setError("Failed to fetch orders.");
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-semibold text-center mb-6">Your Orders</h1>

                {loading && <p className="text-center">Loading orders...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && orders.length > 0 ? (
                    <ul className="bg-gray-50 p-4 rounded-lg">
                        {orders.map((order) => (
                            <li key={order._id || order.id} className="p-3 border-b last:border-none">
                                <p><strong>Order ID:</strong> {order._id || order.id}</p>
                                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p><strong>Total:</strong> ${order.totalAmount}</p>

                                {/* Display Ordered Items with Images */}
                                <div className="mt-2">
                                    <strong>Items:</strong>
                                    {Array.isArray(order.cart.menuItems) ? (
                                        <ul>
                                            {order.cart.menuItems.map((item, index) => (
                                                <li key={index} className="flex items-center gap-4 my-2">
                                                    {/* Item Image */}
                                                    <img
                                                        src={item.image || "https://via.placeholder.com/50"}
                                                        alt={item.name}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    {/* Item Details */}
                                                    <div>
                                                        <p className="font-semibold">{item.name}</p>
                                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No items</p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && !error && <p className="text-center text-gray-600">No orders found.</p>
                )}

                {/* Buttons - Pink & Oval */}
                <div className="mt-4 flex flex-col gap-3">
                    
                    <button
                        onClick={() => navigate("/user/profile")}
                        className="px-6 py-2 text-sm bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all"
                    >
                        🔙 Back to Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDisplay;
