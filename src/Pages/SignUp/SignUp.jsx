import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DynamicTitle from "../../Routes/DynamicTitle";
import { AuthContext } from "../../provider/AuthProvider";
import "./SignUp.css";

const SignUp = () => {
  DynamicTitle("Sign Up");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { createUser, updateUser, googleSignIn } = useContext(AuthContext);
  // get the location user try to go
  const location = useLocation();
  // get the path name
  const from = location.state?.from?.pathname || "/";
  // navigate user to the correct route
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const pattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).+$/;
    const isValidPassword = pattern.test(password);

    if (password === confirmPassword) {
      setError("");
      if (isValidPassword) {
        createUser(email, password)
          .then(() => {
            updateUser(name, photo)
              .then(() => {
                const savedUser = { name, photo, email, role: "student" };
                fetch("https://learn-martial-server.vercel.app/users", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(savedUser),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.insertedId) {
                      setError("");
                      form.reset();
                      navigate(from, { replace: true });
                    }
                  });
              })
              .catch((err) => {
                setError(err.message);
              });
          })
          .catch((err) => {
            setError(err.message);
          });
      } else {
        setError(
          "password should contain at least one uppercase letter, one number and one special character."
        );
      }
    } else {
      setError("Password didn't match");
    }
  };
  // abc
  // abc123
  // abC123
  // abC*23
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
        <h1 className="sign-title">Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />
          </div>

          <div className="field">
            <label htmlFor="photo">PhotoUrl</label>
            <input type="text" name="photo" id="photo" required />
          </div>

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
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={show ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              required
            />
            <span className="show-password" onClick={() => setShow(!show)}>
              <span>{show ? "Hide" : "Show"} Password: </span>
              {show ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </span>
          </div>

          <input type="submit" value={"Sign Up"} className="submit-btn" />
          <p className="sign-toggle">
            Already have an account <Link to="/sign-in">Sign in</Link>
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

export default SignUp;
