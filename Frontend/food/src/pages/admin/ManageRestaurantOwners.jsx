import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";

const ManageRestaurantOwners = () => {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOwners();
    }, []);

    const fetchOwners = async () => {
        try {
            console.log("Fetching restaurant owners...");
            const response = await axiosInstance.get("/admin/get-restaurant-owners");
            console.log("Response from API:", response.data);
            if (!response.data.owners || response.data.owners.length === 0) {
                console.warn("No restaurant owners found in the database.");
            }
            setOwners(response.data.owners);
        } catch (err) {
            console.error("Error fetching restaurant owners:", err.response ? err.response.data : err.message);
            setError("Failed to fetch restaurant owners.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">View Restaurant Owners - Restaurants</h1>

            {loading && <p className="text-center text-gray-600">Loading restaurant owners...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && owners.length === 0 && (
                <p className="text-gray-600 text-center">No restaurant owners found.</p>
            )}

            {!loading && owners.length > 0 && (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Restaurants</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {owners.map((owner) => (
                                <tr key={owner._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">{owner.name}</td>
                                    <td className="py-3 px-6">{owner.email}</td>
                                    <td className="py-3 px-6">
                                        {owner.restaurants && owner.restaurants.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                {owner.restaurants.map((restaurant) => (
                                                    <div key={restaurant._id} className="border rounded-lg p-3 bg-gray-50 shadow-md">
                                                        <h3 className="text-lg font-semibold text-gray-800">{restaurant.name}</h3>
                                                        <p className="text-sm text-gray-600">{restaurant.address}</p>
                                                        <p className="text-sm text-gray-500">📞 {restaurant.phone_number}</p>
                                                        <img 
                                                            src={restaurant.image} 
                                                            alt={restaurant.name} 
                                                            className="w-full h-24 object-cover rounded-lg mt-2"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">No restaurants linked.</p>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-all"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default ManageRestaurantOwners;