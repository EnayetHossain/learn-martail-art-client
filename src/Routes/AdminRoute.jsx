/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import { AuthContext } from "../provider/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const role = useRole();

  const isAdmin = role?.role === "admin";

  if (loading) return <div className="loader"></div>;

  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace={true}></Navigate>;
};

export default AdminRoute;
