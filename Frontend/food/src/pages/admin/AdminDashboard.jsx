import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    restaurantOwners: 0,
    menuItems: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    axiosInstance.get("/admin/dashboard-stats")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-bold mt-10">Loading Dashboard...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg flex flex-col h-full">
        <h2 className="text-xl font-bold">Total Users</h2>
        <p className="text-3xl">{stats.users}</p>
        <div className="mt-auto flex justify-end"> 
          <button
            onClick={() => navigate("/admin/manage-users")}
            className="px-6 py-3 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all"
          >
            👥 Manage Users
          </button>
        </div>
      </div>

        <div className="p-6 bg-green-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Total Restaurant Owners</h2>
          <p className="text-3xl">{stats.restaurantOwners}</p>
          <div className="mt-auto flex justify-end"> 
          <button
            onClick={() => navigate("/admin/manage-restaurant-owners")}
            className="px-6 py-3 bg-purple-500 text-white rounded-full shadow-md hover:bg-purple-600 transition-all"
          >
            🍽️ View Restaurant Owners
          </button>
        </div>
        </div>

        <div className="p-6 bg-yellow-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Total Menu Items</h2>
          <p className="text-3xl">{stats.menuItems}</p>
          <div className="mt-auto flex justify-end"> 
          <button
            onClick={() => navigate("/admin/get-menu-items")}
            className="px-6 py-3 bg-red-500 text-white rounded-full shadow-md hover:bg-yellow-600 transition-all"
          >
            📜 Show Menu Items
          </button>
        </div>
        </div>

        <div className="p-6 bg-red-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Total Orders</h2>
          <p className="text-3xl">{stats.orders}</p>
          <div className="mt-auto flex justify-end"> 
          <button
            onClick={() => navigate("/admin/get-orders")}
            className="px-6 py-3 bg-yellow-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all"
          >
            📦 Show Orders
          </button>
        </div>
        </div>

        <div className="p-6 bg-blue-500 text-white rounded-lg shadow-lg">
          <h2 className="text-xl font-bold">Total Coupons</h2>
          <p className="text-3xl">{stats.coupons}</p>
          <div className="mt-auto flex justify-end"> 
          <button
            onClick={() => navigate("/admin/get-coupons")}
            className="px-6 py-3 bg-green-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all"
          >
            🎟 Manage Coupons
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
