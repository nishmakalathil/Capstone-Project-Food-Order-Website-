import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAdmin } from "../../redux/features/adminSlice";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../config/axiosInstances";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin } = useSelector((state) => state.admin); // Get Admin Info from Redux

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/admin/logout"); // Optional: Call API for logout
      dispatch(clearAdmin()); // Clear Admin from Redux
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      navigate("/restaurantowner/login"); // Redirect to Admin Login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };



  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      {/* ✅ Left Side - Admin Name */}
      <h1 className="text-xl font-bold">
        Admin Panel {admin ? `- ${admin.name}` : ""}
      </h1>

      {/* ✅ Center & Right Side - Dashboard & Logout (Aligned Right) */}
      <div className="flex items-center ml-auto space-x-8">
        {/* Dashboard Link */}
        <nav>
          <ul className="flex items-center gap-6 text-md">
            <li>
              <Link to={"/admin/dashboard"} className="font-bold">Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button 
          onClick={handleLogout} 
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </header>

  );
};

export default AdminHeader;
