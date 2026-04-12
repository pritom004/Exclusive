import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticating, loading, user } = useSelector(
    (state) => state.auth,
  );

  if (isAuthenticating || loading) {
    return <div>Loading...</div>;
  }

  return user ? children : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
