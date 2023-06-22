import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useRole from "../../../Hooks/useRole";
import { AuthContext } from "../../../provider/AuthProvider";
import "./AddClass.css";

const AddClass = () => {
  // DynamicTitle("Add a Class");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("access-token");

  const role = useRole();
  const isInstructor = role?.role === "instructor";

  if (!isInstructor) {
    navigate("/");
    return;
  }

  const handleAddClass = (event) => {
    event.preventDefault();

    const form = event.target;
    const class_name = form.name.value;
    const picture = form.photo.value;
    const Instructor_name = user?.displayName;
    const Instructor_email = user?.email;
    const seats = parseInt(form.seats.value);
    const price = parseFloat(form.price.value);

    const userClass = {
      class_name,
      picture,
      Instructor_name,
      Instructor_email,
      seats,
      price,
      students: 0,
      status: "pending",
    };

    fetch("https://learn-martial-server.vercel.app/classes", {
      method: "POST",
      headers: {
        authorization: `bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(userClass),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Class sent for admin verification");
          form.reset();
        }
      });
  };

  return (
    <section className="sign-section add-class-section">
      <div className="desktop-max form-container">
        <h1 className="sign-title">Add a Class</h1>
        <form onSubmit={handleAddClass} className="add-class">
          <div className="field">
            <label htmlFor="name">Class Name</label>
            <input type="text" name="name" id="name" required />
          </div>

          <div className="field">
            <label htmlFor="photo">Class PhotoURL</label>
            <input type="text" name="photo" id="photo" required />
          </div>

          <div className="field">
            <label htmlFor="InstructorName">Instructor Name</label>
            <input
              type="text"
              name="InstructorName"
              id="InstructorName"
              value={user.displayName}
              readOnly
            />
          </div>

          <div className="field">
            <label htmlFor="email">Instructor Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              readOnly
            />
          </div>

          <div className="field">
            <label htmlFor="seats">Total Seats</label>
            <input type="number" name="seats" id="seats" required />
          </div>

          <div className="field">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              step={"any"}
              name="price"
              id="price"
              required
            />
          </div>

          <input type="submit" value={"Add Class"} className="submit-btn" />

          <p className="error"></p>
        </form>
      </div>
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default AddClass;
