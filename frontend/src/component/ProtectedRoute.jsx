// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import PageNotFound404 from "./PageNotFound404";

const ProtectedRoute = ({ role, requiredRole, redirectTo, children }) => {
  return role === requiredRole ? children : <Navigate to={PageNotFound404} />;
};

export default ProtectedRoute;
