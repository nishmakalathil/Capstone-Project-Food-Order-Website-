import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("userRole");
  return token && role === "admin";
};

const ProtectedRouteAdmin = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRouteAdmin;
