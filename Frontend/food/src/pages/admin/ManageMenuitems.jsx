import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";

const ManageMenuItems = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMenuItems();
    }, []);

    // Fetch all menu items
    
    const fetchMenuItems = async () => {
        try {
            const response = await axiosInstance.get('/admin/get-menu-items', { withCredentials: true });
    
            if (response.data.menuItems) {
                setMenuItems(response.data.menuItems);
            } else {
                setError("No menu items found.");
            }
        } catch (err) {
            console.error("Error fetching menu items:", err);
            setError("Failed to fetch menu items.");
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Menu Items</h1>

            {loading && <p>Loading menu items...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && menuItems.length === 0 && (
                <p className="text-gray-600">No menu items found.</p>
            )}

            {!loading && menuItems.length > 0 && (
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Restaurant</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuItems.map((item) => (
                            <tr key={item._id} className="border-b">
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">${item.price}</td>
                                <td className="p-3">{item.category}</td>
                                <td className="p-3">{item.restaurant_id?.name || "Unknown"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button
                onClick={() => navigate("/admin/dashboard")}
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default ManageMenuItems;
