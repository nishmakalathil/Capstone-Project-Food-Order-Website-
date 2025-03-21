import React, { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstances";

const ManageCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCoupons();
    }, []);


    const fetchCoupons = async () => {
        try {
            const response = await axiosInstance.get("/coupon/get-available");
            console.log("API Response:", response.data.coupons);
            setCoupons(response.data.coupons);
        } catch (err) {
            console.error("Error fetching coupons:", err);
            setError("Failed to fetch coupons.");
        } finally {
            setLoading(false);
        }
    };

    
    const createCoupon = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/admin/create-coupon", {
                code,
                discount,
                expirationDate,
            });

            setCoupons([...coupons, response.data.coupon]); // Add new coupon to the list
            setCode("");
            setDiscount("");
            setExpirationDate("");
        } catch (err) {
            console.error("Error creating coupon:", err);
            setError("Failed to create coupon.");
        }
    };

    
    const deleteCoupon = async (couponCode) => {
        if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    
        try {
            await axiosInstance.delete(`/admin/delete-coupon/${couponCode}`);
    
            // Remove the coupon from the state after successful deletion
            setCoupons(coupons.filter((coupon) => coupon.code !== couponCode));
        } catch (err) {
            console.error("Error deleting coupon:", err);
    
            // Show an alert if the coupon is used in an order
            if (err.response && err.response.status === 400) {
                alert("Cannot delete. This coupon is used in an order.");
            } else {
                alert("Failed to delete coupon. Please try again.");
            }
        }
    };
    

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage Coupons</h1>

            {/* Create Coupon Form */}
            <form onSubmit={createCoupon} className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Create New Coupon</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Coupon Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="p-2 border rounded-lg w-full"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Discount less"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="p-2 border rounded-lg w-full"
                        required
                    />
                    <input
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        className="p-2 border rounded-lg w-full"
                        required
                    />
                </div>
                <button type="submit" className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600">
                    ➕ Create Coupon
                </button>
            </form>

            {/* Coupon List */}
            {loading && <p className="text-center text-gray-600">Loading coupons...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {!loading && coupons.length === 0 && (
                <p className="text-gray-600 text-center">No coupons available.</p>
            )}

            {!loading && coupons.length > 0 && (
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Active Coupons</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Code</th>
                                <th className="py-3 px-6 text-left">Discount less</th>
                                <th className="py-3 px-6 text-left">Expires On</th>
                                <th className="py-3 px-6 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {coupons.map((coupon) => (
                                <tr key={coupon._id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6">{coupon.code}</td>
                                    <td className="py-3 px-6">{coupon.discount}</td>
                                    <td className="py-3 px-6">{new Date(coupon.expirationDate).toLocaleDateString()}</td>
                                    <td className="py-3 px-6">
                                        <button
                                            onClick={() => deleteCoupon(coupon.code)}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            ❌ Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageCoupons;
