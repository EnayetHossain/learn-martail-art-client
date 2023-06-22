import { useEffect, useState } from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DynamicTitle from "../../../Routes/DynamicTitle";
import "./AllUser.css";

const AllUser = () => {
  // TODO: add verification so that no one except admin can access this
  DynamicTitle("All Users");
  const [users, setUsers] = useState();
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://learn-martial-server.vercel.app/users", {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          navigate("/");
        }
        setUsers(data);
      });
  }, [token, navigate]);

  const MakeInstructor = (id) => {
    console.log(id);
    fetch(
      `https://learn-martial-server.vercel.app/users/${id}?role=instructor`,
      {
        method: "PATCH",
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          fetch("https://learn-martial-server.vercel.app/users", {
            headers: {
              authorization: `bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setUsers(data);
            });
          toast.info("This user is now instructor");
        }
      });
  };

  const MakeAdmin = (id) => {
    console.log(id);
    fetch(`https://learn-martial-server.vercel.app/users/${id}?role=admin`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          fetch("https://learn-martial-server.vercel.app/users", {
            headers: {
              authorization: `bearer ${token}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              setUsers(data);
            });
          toast.info("This user is now admin");
        }
      });
  };

  return (
    <div className="overflow-x-auto classes">
      <h1 className="total-price">Total User: {users?.length}</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Picture</th>
            <th>Role</th>
            <th>Email</th>
            <th>Make Instructor</th>
            <th>Make Admin</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={user.photo} alt={user.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm opacity-50">{user.email}</div>
                  </div>
                </div>
              </td>
              <td>{user.role}</td>
              <td>{user.email}</td>
              <td>
                {user.role === "instructor" ? (
                  "instructor"
                ) : (
                  <button
                    onClick={() => MakeInstructor(user._id)}
                    className="delete-btn instructor-btn"
                    title="Make Instructor"
                    disabled={user.role === "admin" ? true : false}
                  >
                    <FaChalkboardTeacher></FaChalkboardTeacher>
                  </button>
                )}
              </td>
              <td>
                {user?.role === "admin" ? (
                  "admin"
                ) : (
                  <button
                    onClick={() => MakeAdmin(user._id)}
                    className="delete-btn admin-btn"
                    title="Make Admin"
                    disabled={user.role === "instructor" ? true : false}
                  >
                    <RiAdminFill></RiAdminFill>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default AllUser;
