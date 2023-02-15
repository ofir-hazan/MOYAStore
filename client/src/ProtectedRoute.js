import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "./Contexts/GlobalContext";

const ProtectedRoute = ({ user, children }) => {
  const { connectedUser } = useContext(GlobalContext);

  if (!connectedUser) {
    return <Navigate to="/signIn" replace />;
  }
  return children;
};

export default ProtectedRoute;
