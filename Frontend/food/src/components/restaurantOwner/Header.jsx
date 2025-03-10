import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { clearAdmin } from "../../redux/features/adminSlice";
import axiosInstance from "../../config/axiosInstances";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get Admin Authentication Status from Redux
  const { isAdminAuth } = useSelector((state) => state.admin);

  // Logout Function
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/admin/logout"); // Call API to logout
      dispatch(clearAdmin()); // Clear Admin Redux state
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      navigate("/restaurantowner/login"); // Redirect to login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-between items-center p-4 md:p-14 h-auto shadow-2xl flex-wrap">
      {/* Logo and Search Bar Section */}
      <div className="flex items-center gap-1 flex-wrap md:flex-nowrap w-full md:w-auto">
        {/* Logo on the left side */}
        <img
          src="https://res.cloudinary.com/dbkexrtm3/image/upload/v1738607157/Logo_xpryjc.png"
          alt="Logo"
          className="w-20 h-20 object-contain -mr-3"
        />

        {/* NishDelight Text with pink color */}
        <h1 className="text-3xl font-bold text-pink-500">NishDelight</h1>

        {/* Oval Search Bar with pink search icon */}
        <div className="relative ml-4 w-full md:w-auto mt-3 md:mt-0">
          <button className="flex items-center justify-between bg-pink-500 text-white rounded-full px-4 py-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm text-white placeholder-white w-full pr-10"
            />
            <span className="text-white pr-2">
              
            </span>
          </button>
        </div>
      </div>

      {/* Navigation and Login Button */}
      <div className="flex justify-center items-center gap-4 md:gap-16 w-full md:w-auto mt-4 md:mt-0">
        <nav>
          <ul className="flex justify-center items-center gap-6 text-md">
            <li><Link to={"/"} className="font-bold">Home</Link></li>
            <li><Link to={"/about"} className="font-bold">About</Link></li> 
          </ul>
        </nav>

        {/* Oval-shaped Login Button */}
        <div className="flex justify-center gap-3">
        {isAdminAuth ? (
            <button 
              onClick={handleLogout}
              className="px-8 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/restaurantowner/login">
              <button className="px-8 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-700 transition duration-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;