import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import Loading from "../components/common/Loading";


const LoginRoute = ({ children }) => {
  const { isAuthenticating, loading, user } = useSelector(
    (state) => state.auth,
  );
    const location = useLocation();
  const query = new URLSearchParams(location.search);
  const redirect = query.get("redirect");


  if (isAuthenticating || loading) {
    return <Loading />;
  }

  return user? (redirect? <Navigate to={`/${redirect}`}/> : <Navigate to='/'/>) : children;
};

export default LoginRoute;
