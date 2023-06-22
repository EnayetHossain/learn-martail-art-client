import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useRole from "../../../Hooks/useRole";
import DynamicTitle from "../../../Routes/DynamicTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import "./EnrolledClasses.css";

const EnrolledClasses = () => {
  const navigate = useNavigate();
  const role = useRole();
  const isStudent = role?.role === "student";

  if (!isStudent) {
    navigate("/");
  }

  DynamicTitle("Your Enrolled Classes");
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(
      `https://learn-martial-server.vercel.app/payments?email=${user.email}`,
      {
        headers: { authorization: `bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, [user, token]);

  return (
    <div className="overflow-x-auto classes">
      <div className="pay-info">
        <h1 className="total-price">
          Total Enrolled Classes: {classes.length}
        </h1>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Instructor Name</th>
            <th>Total Seats</th>
            <th>Seats left</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls._id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={cls.picture} alt={cls.class_name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.displayName}</div>
                    <div className="text-sm opacity-50">{cls.students}</div>
                  </div>
                </div>
              </td>
              <td>{cls.class_name}</td>
              <td>{cls.Instructor_name}</td>
              <td>{cls.seats}</td>
              <td>{cls.seats - cls.students}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default EnrolledClasses;
