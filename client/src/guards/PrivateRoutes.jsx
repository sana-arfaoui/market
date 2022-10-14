import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../shared/Spinner";
const PrivateRoutes = ({ children }) => {
  const { isLoading, isAuthenticated } = useSelector(
    (state) => state.authReducers
  );
  const location = useLocation();
  if (isLoading) {
    return <Spinner />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};
export default PrivateRoutes;
