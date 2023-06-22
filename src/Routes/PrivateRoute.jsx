/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import "./PrivateRoute.css";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <div className="loader"></div>;

  if (user) {
    return children;
  }
  return (
    <Navigate
      to="/sign-in"
      state={{ from: location }}
      replace={true}
    ></Navigate>
  );
};

export default PrivateRoute;
