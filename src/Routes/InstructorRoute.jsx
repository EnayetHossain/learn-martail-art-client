/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";
import { AuthContext } from "../provider/AuthProvider";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const role = useRole();
  console.log(role?.role);
  const isInstructor = role?.role === "instructor";
  console.log(isInstructor);

  if (loading) return <div className="loader"></div>;

  if (user && isInstructor) return children;

  return <Navigate to="/" state={{ from: location }} replace={true}></Navigate>;
};

export default InstructorRoute;
