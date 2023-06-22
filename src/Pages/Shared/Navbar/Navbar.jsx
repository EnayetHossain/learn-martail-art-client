import { useContext, useState } from "react";
import { FaBars, FaMixer } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../provider/AuthProvider";
import "./Navbar.css";

const Navbar = () => {
  // check if the user click on the ham bar or not
  const [open, setOpen] = useState(false);
  // location hook to get user route
  const location = useLocation();
  // get the pathname where user was trying to go
  const { pathname } = location;
  // split the path name to show the active route the user currently in
  const splitLocation = pathname.split("/");
  // get the user data to if user exits or not
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = (event) => {
    event.preventDefault();
    signOutUser()
      .then()
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="nav-container">
      <nav className="navigation desktop-max">
        <div className="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            xmlSpace="preserve"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#EA4C89"
              d="M63.976 32.934c-.131 2.826-2.453 5.078-5.309 5.066a5.325 5.325 0 0 1-1.596-.25c-.012-.005-.021-.002-.034-.007A35.887 35.887 0 0 0 46 36c-1.074 0-2.131.07-3.181.165a1.02 1.02 0 0 0-.76 1.336c.012.033-.018.031-.034.041a95.6 95.6 0 0 1 4.155 18.111c.002.005.012 0 .014.007.029.15.176.277.315.245a28.098 28.098 0 0 0 11.094-12.698l.054.022A2 2 0 0 1 61.5 44c0 .296-.07.577-.184.829-2.703 6.167-7.302 11.307-13.047 14.71a4.131 4.131 0 0 1-1.334.427 4.2 4.2 0 0 1-4.698-3.641c-.009-.065-.056-.144-.079-.216a92.362 92.362 0 0 0-3.836-16.927c-.005-.075-.007-.149-.041-.247a5.244 5.244 0 0 1-.267-1.289c-.204-2.65 1.642-4.96 4.196-5.438A38.558 38.558 0 0 1 46 32c4.283 0 8.407.679 12.276 1.928.128.043.262.072.406.072.646.002 1.158-.471 1.272-1.084.012-.305.046-.605.046-.916 0-4.71-1.186-9.137-3.241-13.03l.026-.015a1.958 1.958 0 0 1-.254-.955 1.993 1.993 0 0 1 3.776-.901c.003 0 .005-.003.008-.005A31.85 31.85 0 0 1 64 32c0 .312-.015.623-.024.934zM52.567 15.016a55.87 55.87 0 0 1-12.329 8.4c-.105.072-.207.147-.361.223a3.342 3.342 0 0 0-1.719 3.976c0 .003-.003.005-.006.008 1.295 4.54-1.119 9.258-5.439 10.926-.007.003-.002.021-.007.026A36.106 36.106 0 0 0 16.461 51.46a3.4 3.4 0 0 0 .744 4.265 27.823 27.823 0 0 0 12.958 4.199l-.002.031a1.993 1.993 0 0 1 1.84 1.983 2 2 0 0 1-2.415 1.956c-5.321-.397-10.264-2.116-14.541-4.8-3.14-2.276-3.937-6.57-1.905-9.831 4.473-6.448 10.775-11.52 18.174-14.445a.924.924 0 0 1 .102-.061 4.96 4.96 0 0 0 2.86-6.063c-.032-.102-.046-.185-.065-.274A7.493 7.493 0 0 1 38 20.071a51.766 51.766 0 0 0 11.707-7.84 1.596 1.596 0 0 0-.148-1.969C44.754 6.368 38.666 4 32 4c-2.732 0-5.36.424-7.854 1.159a.496.496 0 0 0-.039.65c.007.01-.012.005-.017.005a96.747 96.747 0 0 1 9.353 13.064 6.484 6.484 0 0 1-1.064 6.821c.014.024.021.054.039.078.116.191-.02.239-.301.201a6.287 6.287 0 0 1-1.275 1.035 6.665 6.665 0 0 1-.902.443A64.12 64.12 0 0 1 12 30c-.962 0-1.91-.031-2.858-.059-4.08-.271-7.253-3.716-7.139-7.84a7.67 7.67 0 0 1 .596-2.744c2.185-5.069 5.651-9.444 9.976-12.759A2 2 0 0 1 16 8a1.99 1.99 0 0 1-.805 1.596l.026.033a28.085 28.085 0 0 0-9.03 11.583A3.618 3.618 0 0 0 6 22.288a3.643 3.643 0 0 0 3.477 3.666c.835.022 1.672.046 2.523.046 5.777 0 11.326-.805 16.517-2.278.102-.047.208-.075.308-.139a2.467 2.467 0 0 0 1.062-2.814 92.83 92.83 0 0 0-8.756-12.211c-.024-.056-.042-.109-.085-.162a4.491 4.491 0 0 1-.87-1.642c-.665-2.311.621-4.7 2.868-5.467A31.936 31.936 0 0 1 32 0a31.86 31.86 0 0 1 20.012 7.037c2.279 1.938 2.657 5.334.801 7.712-.077.097-.166.175-.246.267zM3.993 33.935l.102.003a27.818 27.818 0 0 0 4.23 12.926c-.012.01-.026.017-.036.026A2 2 0 0 1 6.625 50a1.998 1.998 0 0 1-1.886-1.355C2.225 44.532.587 39.826.153 34.762a1.997 1.997 0 1 1 3.84-.827zM38 60a2 2 0 1 1 .001 3.999A2 2 0 0 1 38 60z"
            />
          </svg>
          <p>Martial</p>
        </div>

        <ul className="menu-items">
          <li className="menu-item">
            <Link className={splitLocation[1] === "" ? "active" : ""} to="/">
              Home
            </Link>
          </li>
          <li className="menu-item">
            <Link
              className={splitLocation[1] === "instructors" ? "active" : ""}
              to="/instructors"
            >
              Instructors
            </Link>
          </li>
          <li className="menu-item">
            <Link
              className={splitLocation[1] === "classes" ? "active" : ""}
              to="/classes"
            >
              Classes
            </Link>
          </li>
          {user && (
            <li className="menu-item">
              <Link
                className={splitLocation[1] === "dashboard" ? "active" : ""}
                to="/dashboard/"
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="sign-menu">
          {user && (
            <div className="profile">
              <img
                src={user.photoURL ? user.photoURL : ""}
                title={user.displayName ? user.displayName : ""}
                alt={user.displayName ? user.displayName : "profile"}
              />
            </div>
          )}

          {user ? (
            <button onClick={handleSignOut} className="sign-btn btn">
              Sign Out
            </button>
          ) : (
            <>
              <Link className={"sign-btn"} to="sign-in">
                Sign in
              </Link>
              <Link className="sign-btn" to="sign-up">
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className={`mobile-menu ${open ? "height-100" : "height-0"}`}>
          <ul className="mobile-menu-items">
            <li className="menu-item">
              <Link className={splitLocation[1] === "" ? "active" : ""} to="/">
                Home
              </Link>
            </li>
            <li className="menu-item">
              <Link
                className={splitLocation[1] === "instructors" ? "active" : ""}
                to="/instructors"
              >
                Instructors
              </Link>
            </li>
            <li className="menu-item">
              <Link
                className={splitLocation[1] === "classes" ? "active" : ""}
                to="/classes"
              >
                Classes
              </Link>
            </li>
            {user && (
              <li className="menu-item">
                <Link
                  className={splitLocation[1] === "dashboard" ? "active" : ""}
                  to="/dashboard/"
                >
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          <div className="mobile-sign-menu">
            {user && (
              <div className="profile">
                <img
                  src={user.photoURL ? user.photoURL : ""}
                  title={user.displayName ? user.displayName : ""}
                  alt={user.displayName ? user.displayName : "profile"}
                />
              </div>
            )}

            <div className="mobile-sign-link">
              {user ? (
                <button onClick={handleSignOut} className="sign-btn btn">
                  Sign Out
                </button>
              ) : (
                <>
                  <Link className="sign-btn" to="sign-in">
                    Sign in
                  </Link>
                  <Link className="sign-btn" to="sign-up">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div onClick={() => setOpen(!open)} className="bars">
          {open ? <FaMixer></FaMixer> : <FaBars></FaBars>}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
