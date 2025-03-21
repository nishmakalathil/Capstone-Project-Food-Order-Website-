import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
const ProtectedRoute = () => {
    const navigate = useNavigate();
    //const isUserAuth = useSelector((state) => state.user.isUserAuth);
    
    
    return <Outlet />;
};
export default ProtectedRoute;