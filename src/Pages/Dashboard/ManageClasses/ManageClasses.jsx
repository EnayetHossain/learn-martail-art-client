import { useEffect, useState } from "react";
import { MdDoneAll, MdFeedback, MdNotInterested } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import useRole from "../../../Hooks/useRole";
import DynamicTitle from "../../../Routes/DynamicTitle";
import "./ManageClasses.css";

const ManageClasses = () => {
  const navigate = useNavigate();
  const role = useRole();
  console.log(role);
  const isAdmin = role?.role === "admin";
  console.log(isAdmin);
  if (!isAdmin) {
    navigate("/");
  }

  DynamicTitle("Manage Classes");
  const token = localStorage.getItem("access-token");
  const [classes, setClasses] = useState([]);
  const [classId, setClassId] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("https://learn-martial-server.vercel.app/pending-classes", {
      headers: { authorization: `bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setClasses(data);
      });
  }, [token]);

  const approveClass = (id) => {
    console.log(id);
    fetch(
      `https://learn-martial-server.vercel.app/pending-classes/${id}?status=approved`,
      {
        method: "PATCH",
        headers: {
          authorization: `bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "approved" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Class approved");
        }
      });
  };

  const denyClass = (id) => {
    console.log(id);
    fetch(
      `https://learn-martial-server.vercel.app/pending-classes/${id}?status=denied`,
      {
        method: "PATCH",
        headers: {
          authorization: `bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ status: "denied" }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.warning("Class denied");
        }
      });
  };

  const openFeedback = (id) => {
    setClassId(id);
    setModal(true);
  };
  console.log(classId);

  const sendFeedback = (event) => {
    event.preventDefault();
    const form = event.target;
    const feed = form.feedback.value;
    const feedback = { feedback: feed };

    fetch(`https://learn-martial-server.vercel.app/feedback/${classId}`, {
      method: "PATCH",
      headers: {
        authorization: `bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(feedback),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          form.reset();
          toast.info("Feedback sent");
        }
      });
  };

  return (
    <div className="classes">
      <div className="overflow-x-auto">
        <h1 className="total-price">Total Classes: {classes.length}</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Class Image</th>
              <th>Instructor Name</th>
              <th>Instructor Email</th>
              <th>Total Seats</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
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
                <td>{cls.Instructor_name}</td>
                <td>{cls.Instructor_email}</td>
                <td>{cls.seats}</td>
                <td>${cls.price}</td>
                <td>{cls?.status}</td>
                <td className="action">
                  <button
                    onClick={() => approveClass(cls._id)}
                    disabled={
                      cls?.status === "approved" || cls?.status === "denied"
                        ? true
                        : false
                    }
                    className="delete-btn admin-btn"
                    title="Approve"
                  >
                    <MdDoneAll></MdDoneAll>
                  </button>

                  <button
                    onClick={() => denyClass(cls._id)}
                    className="delete-btn"
                    title="Deny"
                    disabled={
                      cls?.status === "approved" || cls?.status === "denied"
                        ? true
                        : false
                    }
                  >
                    <MdNotInterested></MdNotInterested>
                  </button>

                  <button
                    onClick={() => openFeedback(cls._id)}
                    disabled={cls?.status === "pending" ? true : false}
                    className="delete-btn instructor-btn"
                    title="Send Feedback"
                  >
                    <MdFeedback></MdFeedback>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ToastContainer></ToastContainer>
      </div>
      {modal && (
        <section className="sign-section modal-window feedback-modal-window add-class-section">
          <div className="modal-background">
            <div className="desktop-max form-container">
              <h1 className="sign-title">Send Feedback</h1>
              <form onSubmit={sendFeedback} className="add-class">
                <div className="field">
                  <input
                    type="hidden"
                    value={classId}
                    readOnly
                    name="classId"
                  />
                </div>

                <div className="field">
                  <label htmlFor="feedback">Your Feedback</label>
                  <textarea
                    name="feedback"
                    id="feedback"
                    cols={30}
                    rows={10}
                  ></textarea>
                </div>

                <input
                  type="submit"
                  value={"Send Feedback"}
                  className="submit-btn"
                />

                <p className="error"></p>
              </form>
              <button onClick={() => setModal(false)} className="close-btn">
                close
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ManageClasses;
