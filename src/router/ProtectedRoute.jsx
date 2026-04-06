import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/user.context.jsx";

function ProtectedRoute({ children }) {
  const { userName } = useContext(UserContext);
  const location = useLocation();
  console.log('LOCATION: ', location)

  if (!userName) {
    return <Navigate to="/h2h/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
