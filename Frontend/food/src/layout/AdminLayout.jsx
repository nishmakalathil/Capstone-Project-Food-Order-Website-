import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../config/axiosInstances";
import { clearAdmin, saveAdmin } from "../redux/features/adminSlice";
import AdminHeader from "../components/admin/AdminHeader";
import Header from "../components/restaurantOwner/Header";
import Footer from "../components/user/Footer";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const adminState = useSelector((state) => state.admin || {});
  const { isAdminAuth } = adminState;


  console.log('Admin auth : ' + isAdminAuth);


  const checkAdminAuth = async () => {
    try {
      const response = await axiosInstance.get("/admin/check-admin", {
        withCredentials: true,
      })

      console.log("Admin auth response");
      console.log(response);

      if (response.data && response.data.authenticated) {
        dispatch(saveAdmin(response.data.user));
      } else {
        dispatch(clearAdmin());
        if (location.pathname !== "/restaurantowner/login") {
          navigate("/restaurantowner/login"); 
        }
      }
    } catch (error) {
      dispatch(clearAdmin());
      if (location.pathname !== "/restaurantowner/login") {
        navigate("/restaurantowner/login"); 
      }
    }
  };

  useEffect(() => {
    //  const token = localStorage.getItem("authToken");
    //  const role = localStorage.getItem("userRole");

    // if (token && role === "admin") {
    //    dispatch(saveAdmin({ role: "admin" })); 
    // } else {
      checkAdminAuth(); 
    //}
  }, []); 

  return (
    <div>
      {isAdminAuth ? <AdminHeader /> : <Header />} {/* Show AdminHeader if authenticated */}
      <div className="min-h-96">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
