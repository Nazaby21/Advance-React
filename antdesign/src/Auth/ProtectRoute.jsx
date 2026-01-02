import React from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

const ProtectRoute = () => {
  const isAuth = localStorage.getItem("isAuth"); // or your auth logic
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return <Dashboard /> ;
};

export default ProtectRoute;
