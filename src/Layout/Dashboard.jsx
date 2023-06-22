import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { ImCheckboxChecked } from "react-icons/im";
import { MdPayment, MdTabUnselected } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { Link, Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";
import DynamicTitle from "../Routes/DynamicTitle";
import "./Dashboard.css";

const Dashboard = () => {
  DynamicTitle("Dashboard");

  const role = useRole();
  const isAdmin = role?.role === "admin";
  const isStudent = role?.role === "student";
  const isInstructor = role?.role === "instructor";

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden dashboard-menu-btn"
        >
          Open Menu
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {isAdmin && (
            <>
              <li>
                <Link to="manage-classes">
                  <MdTabUnselected></MdTabUnselected>
                  Manage Classes
                </Link>
              </li>
              <li>
                <Link to="manage-users">
                  <FaUsers></FaUsers>Manage Users
                </Link>
              </li>
            </>
          )}

          {isStudent && (
            <>
              <li>
                <Link to="selected-classes">
                  <MdTabUnselected></MdTabUnselected>
                  Selected Classes
                </Link>
              </li>
              <li>
                <Link to="enrolled-classes">
                  <ImCheckboxChecked></ImCheckboxChecked>Enrolled Classes
                </Link>
              </li>
              <li>
                <Link to="payment-history">
                  <MdPayment></MdPayment>Payment History
                </Link>
              </li>
            </>
          )}

          {isInstructor && (
            <>
              <li>
                <Link to="add-class">
                  <MdTabUnselected></MdTabUnselected>
                  Add a Class
                </Link>
              </li>
              <li>
                <Link to="my-classes">
                  <ImCheckboxChecked></ImCheckboxChecked>MY Classes
                </Link>
              </li>
            </>
          )}

          <div className="divider">OR</div>
          <li>
            <Link to="/">
              <AiFillHome></AiFillHome>Home
            </Link>
          </li>
          <li>
            <Link to="/instructors">
              <GiTeacher></GiTeacher>Instructors
            </Link>
          </li>
          <li>
            <Link to="/classes">
              <SiGoogleclassroom></SiGoogleclassroom>Classes
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
