import { useContext, useEffect, useState } from "react";
import { MdFeedback, MdTipsAndUpdates } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useRole from "../../../Hooks/useRole";
import DynamicTitle from "../../../Routes/DynamicTitle";
import { AuthContext } from "../../../provider/AuthProvider";
import "./MyClasses.css";

const MyClasses = () => {
  DynamicTitle("My Classes");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const [adminFeedback, setAdminFeedback] = useState("");
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [classes, setClasses] = useState([]);
  const [updateClass, setUpdateClass] = useState([]);
  const token = localStorage.getItem("access-token");
  const role = useRole();
  const isInstructor = role?.role === "instructor";

  if (!isInstructor) {
    navigate("/");
  }

  useEffect(() => {
    fetch(
      `https://learn-martial-server.vercel.app/my-classes?email=${user?.email}`,
      {
        headers: {
          authorization: `bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClasses(data);
      });
  }, [user, token]);

  const getClassData = (id) => {
    fetch(`https://learn-martial-server.vercel.app/my-classes/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdateClass(data);
        setModal(true);
      });
  };

  const handleUpdateClass = (event) => {
    event.preventDefault();

    const form = event.target;
    const id = form.classId.value;
    const class_name = form.name.value;
    const picture = form.photo.value;
    const seats = parseInt(form.seats.value);
    const price = parseFloat(form.price.value);

    const update = {
      class_name,
      picture,
      seats,
      price,
    };

    fetch(`https://learn-martial-server.vercel.app/my-classes/${id}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(update),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          fetch(
            `https://learn-martial-server.vercel.app/my-classes?email=${user?.email}`,
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              setClasses(data);
            });
          toast.success("Data updated");
        }
      });
  };

  const openFeedbackModal = (id) => {
    console.log(id);
    fetch(`https://learn-martial-server.vercel.app/my-classes/${id}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAdminFeedback(data.feedback);
      });
    setFeedbackModal(true);
  };

  return (
    <div className="classes">
      <div className="overflow-x-auto">
        <h1 className="total-price">Total Classes: {classes?.length}</h1>

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Picture</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Enrolled Students</th>
              <th>Instructor Name</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {classes?.map((cls) => (
              <tr key={cls._id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={cls.picture} alt={cls.class_name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cls.class_name}</div>
                      <div className="text-sm opacity-50">
                        {cls.Instructor_email}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{cls.status}</td>

                <td>
                  {cls.status === "denied" || cls.status === "approved" ? (
                    <button
                      onClick={() => openFeedbackModal(cls._id)}
                      className="delete-btn instructor-btn"
                      title="Show Feedback"
                    >
                      <MdFeedback></MdFeedback>
                    </button>
                  ) : (
                    <p>no feedback</p>
                  )}
                </td>

                <td>{cls.students}</td>
                <td>{cls.Instructor_name}</td>
                <td>
                  <button
                    onClick={() => getClassData(cls._id)}
                    className="delete-btn admin-btn"
                    title="Update Class"
                  >
                    <MdTipsAndUpdates></MdTipsAndUpdates>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <section className="sign-section modal-window add-class-section">
          <div className="modal-background">
            <div className="desktop-max form-container">
              <h1 className="sign-title">Update a Class</h1>
              <form onSubmit={handleUpdateClass} className="add-class">
                <div className="field">
                  <input
                    type="hidden"
                    name="classId"
                    value={updateClass._id}
                    readOnly
                    id="classId"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="name">Class Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={updateClass.class_name}
                    id="name"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="photo">Class PhotoURL</label>
                  <input
                    type="text"
                    name="photo"
                    defaultValue={updateClass.picture}
                    id="photo"
                  />
                </div>

                <div className="field">
                  <label htmlFor="seats">Total Seats</label>
                  <input
                    type="number"
                    name="seats"
                    defaultValue={updateClass.seats}
                    id="seats"
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    step={"any"}
                    name="price"
                    defaultValue={updateClass.price}
                    id="price"
                  />
                </div>

                <input
                  type="submit"
                  value={"Update Class"}
                  className="submit-btn"
                />

                <p className="error"></p>
              </form>
              <button onClick={() => setModal(false)} className="close-btn">
                close
              </button>
            </div>
          </div>
          <ToastContainer></ToastContainer>
        </section>
      )}

      {feedbackModal && (
        <div className="feedback">
          <p className="feedback-text">
            {!adminFeedback ? "no feedback" : adminFeedback}
          </p>
          <button onClick={() => setFeedbackModal(false)} className="close-btn">
            close
          </button>
        </div>
      )}
    </div>
  );
};

export default MyClasses;
