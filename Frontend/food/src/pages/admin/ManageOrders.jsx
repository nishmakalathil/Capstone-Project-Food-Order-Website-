import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get("/admin/get-orders");
            console.log("Server response:", response.data); // Log the response
            if (response.data && response.data.orders) {
                setOrders(response.data.orders);
            } else {
                console.warn("No orders found in the response.");
                setOrders([]);
            }
        } catch (err) {
            console.error("Error fetching orders:", err);
            setError("Failed to fetch orders.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">View Orders</h1>

            {loading && <p>Loading orders...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && orders && orders.length === 0 && (
                <p className="text-gray-600">No orders found.</p>
            )}

            {!loading && orders && orders.length > 0 && (
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Order ID</th>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b">
                                <td className="p-3">{order._id}</td>
                                <td className="p-3">{order.userId?.name || "Unknown"}</td>
                                <td className="p-3">${order.totalAmount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button
                onClick={() => navigate("/admin/dashboard")}
                className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default ManageOrders;
