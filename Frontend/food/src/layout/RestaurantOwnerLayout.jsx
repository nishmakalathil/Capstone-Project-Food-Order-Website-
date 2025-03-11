import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../config/axiosInstances";
import { clearRestaurantOwner, saveRestaurantOwner } from "../redux/features/restaurantOwnerSlice";
import RestaurantOwnerHeader from "../components/restaurantOwner/RestaurantOwnerHeader";
import Header from "../components/restaurantOwner/Header";
import Footer from "../components/user/Footer";

const RestaurantOwnerLayout = () => {
  const { isRestaurantOwnerAuth } = useSelector((state) => state.restaurantOwner); 
  const dispatch = useDispatch();
  const location = useLocation(); 

  
  const checkRestaurantOwner = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/restaurantOwner/check-restaurant-owner", 
      });

      
      if (response.data && response.data.authenticated) {
        dispatch(saveRestaurantOwner(response.data.user)); 
      } else {
        dispatch(clearRestaurantOwner()); 
      }
      console.log("isRestaurantOwnerAuth in RestaurantOwnerLayout:", isRestaurantOwnerAuth); 
      
    } catch (error) {
      dispatch(clearRestaurantOwner()); 
      console.error("Error checking restaurant owner authentication:", error);
    }
  };

  useEffect(() => {
    checkRestaurantOwner(); 
  }, [location.pathname]); 

  return (
    <div>
      
      {isRestaurantOwnerAuth ? <RestaurantOwnerHeader /> : <Header />}
      
      
      <div className="min-h-96">
        <Outlet />
      </div>

      
      <Footer />
    </div>
  );
};

export default RestaurantOwnerLayout;
