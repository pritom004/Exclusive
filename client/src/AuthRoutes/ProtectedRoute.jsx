import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticating, loading, user } = useSelector(
    (state) => state.auth,
  );

  if (isAuthenticating || loading) {
    return <Loading/>;
  }

  return user ? children : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
