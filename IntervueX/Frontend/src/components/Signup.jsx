import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Signup() {
  const [usermail, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState(null);
  const [signup, setSignup] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handle_change = (e) => {
    e.preventDefault();
    if (e.target.name === "usermail") setUsermail(e.target.value.trim());
    else if (e.target.name === "password") setPassword(e.target.value.trim());
    else if (e.target.name === "confirm_password")
      setConfirm(e.target.value.trim());
  };

  const handle_submit = async (e) => {
    e.preventDefault();

    if (usermail === "" || password === "") return setErr("Invalid inputs");
    if (!validateEmail(usermail)) return setErr("Invalid mail ID");

    if (signup && confirm !== password) return setErr("Passwords not matched");

    if (signup) {
      try {
        const res = await fetch("http://localhost:5000/api/insertUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            email: usermail,
            password: password,
          },
        });
        const data = await res.json();
        if (data.success) {
          setErr(null);
          alert("Signup successful! Please login.");
          setSignup(false);
        } else {
          setErr(data.message || "Signup failed");
        }
      } catch (err) {
        setErr("Signup failed, maybe server issue");
      }
    }

    else {
      try {
        const res = await fetch("http://localhost:5000/api/verifyUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            email: usermail,
            password: password,
          },
          credentials: "include",
        });
        const data = await res.json();

        if (data.success) {
          const resUser = await fetch(
            "http://localhost:5000/api/currentUser",
            {
              credentials: "include",
            }
          );
          const userData = await resUser.json();

          if (userData.success) {
            setAuth({ email: userData.email, logged: true }); 
            setErr(null);
            navigate("/dashboard");
          } else {
            setErr("Failed to fetch user session");
          }
        } else {
          setErr(data.message || "Invalid details provided");
        }
      } catch (err) {
        setErr("Login failed");
      }
    }
  };

  function validateEmail(email) {
    const pattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  }

  const handle_click = () => setSignup(!signup);

  return (
    <div>
      {signup && (
        <div className="signup-panel">
          <form className="form">
            <span className="signup">Sign Up</span>

            <input
              type="email"
              placeholder="Email address"
              className="form--input"
              name="usermail"
              onChange={handle_change}
            />

            <input
              type="password"
              placeholder="Password"
              className="form--input"
              name="password"
              onChange={handle_change}
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="form--input"
              name="confirm_password"
              onChange={handle_change}
            />

            <div className="form--marketing">
              <input id="okayToEmail" type="checkbox" />
              <label htmlFor="okayToEmail" className="checkbox">
                I want to join IntervueX
              </label>
            </div>

            <div className="label2">
              <label>
                Already have an account?{" "}
                <span
                  className="text-gray-600 underline mx-[0.2rem] cursor-pointer"
                  onClick={handle_click}
                >
                  Login
                </span>
              </label>
            </div>

            <button className="form--submit" onClick={handle_submit}>
              Sign up
            </button>
            {err && (
              <div className="absolute top-[68vh] text-red-700">{err}</div>
            )}
          </form>
        </div>
      )}

      {!signup && (
        <div className="login-panel">
          <form className="form">
            <span className="signup">Log-In</span>

            <input
              type="email"
              placeholder="Email address"
              className="form--input"
              name="usermail"
              onChange={handle_change}
            />

            <input
              type="password"
              placeholder="Password"
              className="form--input"
              name="password"
              onChange={handle_change}
            />

            <div className="label2">
              <label>
                Don’t have an account?{" "}
                <span
                  className="text-gray-600 underline mx-[0.2rem] cursor-pointer"
                  onClick={handle_click}
                >
                  Signup
                </span>
              </label>
            </div>

            <button className="form--submit" onClick={handle_submit}>
              Log-In
            </button>
            {err && (
              <div className="absolute top-[68vh] text-red-700">{err}</div>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default Signup;
