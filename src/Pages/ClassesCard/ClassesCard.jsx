/* eslint-disable react/prop-types */
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../provider/AuthProvider";
import "./ClassesCard.css";

const ClassesCard = ({ cls }) => {
  const { picture, Instructor_name, price, seats, class_name, students, _id } =
    cls;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("access-token");

  const handleSelectClass = (id) => {
    if (user && user.email) {
      const userSelectedClass = {
        classId: id,
        class_name,
        Instructor_name,
        picture,
        price,
        seats,
        students,
        studentEmail: user.email,
      };

      fetch("https://learn-martial-server.vercel.app/selectedClass", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${token}`,
        },
        body: JSON.stringify(userSelectedClass),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            toast.success("Class selected");
          }
        });
    } else {
      const isConfirm = confirm("please login to select a class");
      if (isConfirm) {
        navigate("/sign-in", { state: { from: location } });
      }
    }
  };

  return (
    <div className={`classes-card ${seats - students <= 0 ? "disable" : ""}`}>
      <div className="classes-img">
        <img src={picture} alt={class_name} />
      </div>

      <div className="classes-info">
        <p className="classes-name">{class_name}</p>
        <p className="classes-instructor">{Instructor_name}</p>
      </div>

      <div className="seats-price">
        <p className="price">${price}</p>
        <p className="seats">Available seats: {seats - students}</p>
      </div>

      <button
        onClick={() => handleSelectClass(_id)}
        disabled={seats - students <= 0}
        className="add-btn"
      >
        Select Class
      </button>
      <ToastContainer />
    </div>
  );
};

export default ClassesCard;
