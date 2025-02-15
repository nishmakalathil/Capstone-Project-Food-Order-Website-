import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../config/axiosInstances";
import { clearRestaurantOwner, saveRestaurantOwner } from "../redux/features/restaurantOwnerSlice";
import RestaurantOwnerHeader from "../components/restaurantOwner/RestaurantOwnerHeader";
import Header from "../components/restaurantOwner/Header";
import Footer from "../components/user/Footer";

const RestaurantOwnerLayout = () => {
  const { isRestaurantOwnerAuth } = useSelector((state) => state.restaurantOwner); // Authentication state from Redux
  const dispatch = useDispatch();
  const location = useLocation(); // To detect URL changes

  // Debugging the authentication state
  

  // Function to check if the restaurant owner is authenticated
  const checkRestaurantOwner = async () => {
    try {
      const response = await axiosInstance({
        method: "GET",
        url: "/restaurantOwner/check-restaurant-owner", // API to check restaurant owner authentication status
      });

      // If authenticated, save restaurant owner data to Redux
      if (response.data && response.data.authenticated) {
        dispatch(saveRestaurantOwner(response.data.user)); // Dispatch action to save user data in Redux
      } else {
        dispatch(clearRestaurantOwner()); // Clear state if not authenticated
      }
      console.log("isRestaurantOwnerAuth in RestaurantOwnerLayout:", isRestaurantOwnerAuth); // Should log true when authenticated
      
    } catch (error) {
      dispatch(clearRestaurantOwner()); // Handle errors by clearing the state
      console.error("Error checking restaurant owner authentication:", error);
    }
  };

  useEffect(() => {
    checkRestaurantOwner(); // Trigger authentication check on URL change
  }, [location.pathname]); // Dependency array ensures it runs on location change

  return (
    <div>
      {/* Render the correct header based on authentication status */}
      {isRestaurantOwnerAuth ? <RestaurantOwnerHeader /> : <Header />}
      
      {/* Render nested routes */}
      <div className="min-h-96">
        <Outlet />
      </div>

      {/* Common footer */}
      <Footer />
    </div>
  );
};

export default RestaurantOwnerLayout;
