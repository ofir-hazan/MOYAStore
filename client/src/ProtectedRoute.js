import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "./Contexts/GlobalContext";

const ProtectedRoute = ({ admin, children }) => {
  const { connectedUser } = useContext(GlobalContext);

  if (!connectedUser) {
    return <Navigate to="/signIn" replace />;
  } else if (admin && connectedUser.role !== "admin") {
    return null;
  }
  return children;
};

export default ProtectedRoute;
