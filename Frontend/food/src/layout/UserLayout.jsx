import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import Header from "../components/user/Header";
import UserHeader from "../components/user/UserHeader";
import axiosInstance from "../config/axiosInstances";
import Footer from "../components/user/Footer";

const UserLayout = () => {
  const { isUserAuth } = useSelector((state) => state.user);  // Get authentication status from Redux
  const dispatch = useDispatch();
  const location = useLocation();  // Track location change

  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/user/check-user");
      console.log("API Response:", response.data);  // Log API response

      if (response.data.authenticated) {
        dispatch(saveUser(response.data.user));  // Save user data to Redux if authenticated
      } else {
        dispatch(clearUser());  // Clear user data if not authenticated
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);  // Log any errors
      dispatch(clearUser());  // Clear user data if there's an error
    }
  };

  useEffect(() => {
    checkUser();  // Check user authentication when the component mounts or location changes
  }, [location.pathname]);

  useEffect(() => {
    console.log("isUserAuth:", isUserAuth);  // Log the authentication state change
  }, [isUserAuth]);

  return (
    <div>
      {isUserAuth ? <UserHeader /> : <Header />}  {/* Show UserHeader only if authenticated */}
      <div className="min-h-96">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
