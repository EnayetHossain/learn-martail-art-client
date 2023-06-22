import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DynamicTitle from "../../Routes/DynamicTitle";
import { AuthContext } from "../../provider/AuthProvider";
import "./SignIn.css";

const SignIn = () => {
  DynamicTitle("Sign In");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { signInUser, googleSignIn } = useContext(AuthContext);
  // get the location user try to go
  const location = useLocation();
  // get the path name
  const from = location.state?.from?.pathname || "/";
  // navigate user to the correct route
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then(() => {
        setError("");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const signInWithGoogle = () => {
    googleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        const savedUser = {
          name: loggedUser.displayName,
          photo: loggedUser.photoURL,
          email: loggedUser.email,
          role: "student",
        };
        fetch("https://learn-martial-server.vercel.app/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(savedUser),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId || data.message) {
              setError("");
              navigate(from, { replace: true });
            }
          });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <section className="sign-section">
      <div className="desktop-max form-container">
        <h1 className="sign-title">Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type={show ? "text" : "password"}
              name="password"
              id="password"
              required
            />
            <span className="show-password" onClick={() => setShow(!show)}>
              <span>{show ? "Hide" : "Show"} Password: </span>
              {show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>

          <input type="submit" value={"Sign In"} className="submit-btn" />
          <p className="sign-toggle">
            Don{"'"}t have an account <Link to="/sign-up">Sign up</Link>
          </p>
          <p className="error">{error}</p>
          <hr />
        </form>
        <div className="social-login">
          <p>Sign in with social</p>
          <button onClick={signInWithGoogle} className="google-btn">
            <FaGoogle></FaGoogle>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
