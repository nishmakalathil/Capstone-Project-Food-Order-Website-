import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import Header from "../components/user/Header";
import UserHeader from "../components/user/UserHeader";
import axiosInstance from "../config/axiosInstances";
import Footer from "../components/user/Footer";

const UserLayout = () => {
  const { isUserAuth } = useSelector((state) => state.user);  
  const dispatch = useDispatch();
  const location = useLocation();  

  const checkUser = async () => {
    try {
      const response = await axiosInstance.get("/user/check-user");
      console.log("API Response:", response.data);  

      if (response.data.authenticated) {
        dispatch(saveUser(response.data.user));  
      } else {
        dispatch(clearUser());  
      }
    } catch (error) {
      console.error("Error checking user authentication:", error);  
      dispatch(clearUser());  
    }
  };

  useEffect(() => {
    checkUser();  
  }, [location.pathname]);

  useEffect(() => {
    console.log("isUserAuth:", isUserAuth);  
  }, [isUserAuth]);

  return (
    <div>
      {isUserAuth ? <UserHeader /> : <Header />}  
      <div className="min-h-96">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default UserLayout;
