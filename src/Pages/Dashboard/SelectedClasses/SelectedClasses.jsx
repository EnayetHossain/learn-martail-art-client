import { useContext, useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useRole from "../../../Hooks/useRole";
import DynamicTitle from "../../../Routes/DynamicTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import "./SelectedClasses.css";

const SelectedClasses = () => {
  const navigate = useNavigate();
  const role = useRole();
  const isStudent = role?.role === "student";

  if (!isStudent) {
    navigate("/");
  }

  DynamicTitle("Your Selected Class");
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(
      `https://learn-martial-server.vercel.app/selectedClass?email=${user.email}`,
      {
        headers: { authorization: `bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      });
  }, [user, token]);

  const total = classes.map((cls) => cls.price).reduce((a, b) => a + b, 0);

  const handleDelete = (id) => {
    const proceed = confirm("Are you sure?");
    if (proceed) {
      fetch(`https://learn-martial-server.vercel.app/selectedClass/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            const remaining = classes.filter((cls) => cls._id !== id);
            setClasses(remaining);
            toast.info("Your class has been deleted");
          }
        });
    }
  };

  const classNames = classes.map((name) => name.class_name);
  const classPhotos = classes.map((name) => name.picture);
  const selectedClassIds = classes.map((name) => name._id);
  const classIds = classes.map((name) => name.classId);

  return (
    <div className="overflow-x-auto classes">
      <div className="pay-info">
        <h1 className="total-price">Total Price: ${total}</h1>
        <Link
          className={`pay-btn ${total === 0 ? "display-none" : ""}`}
          to="/dashboard/payment"
          state={{
            totalPrice: total,
            quantity: classes.length,
            classNames,
            classPhotos,
            selectedClassIds,
            classIds,
          }}
        >
          Pay
        </Link>
      </div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row */}
          {classes.map((cls) => (
            <tr key={cls._id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={cls.picture}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{cls.Instructor_name}</div>
                    <div className="text-sm opacity-50">{cls.students}</div>
                  </div>
                </div>
              </td>
              <td>{cls.class_name}</td>
              <td>${cls.price}</td>
              <th className="class-action">
                <button
                  onClick={() => handleDelete(cls._id)}
                  title="Delete Class"
                  className="delete-btn"
                >
                  <BsTrashFill></BsTrashFill>
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SelectedClasses;
