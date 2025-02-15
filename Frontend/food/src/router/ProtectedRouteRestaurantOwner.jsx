// src/router/ProtectedRouteRestaurantOwner.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRouteRestaurantOwner = () => {
    const navigate = useNavigate();
    const isUserAuth = useSelector((state) => state.restaurantOwner.isRestaurantOwnerAuth);

    return <Outlet />;
};

export default ProtectedRouteRestaurantOwner;
