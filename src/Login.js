import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setEmail("");
    setPassword("");
    setError("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        setEmail("");
        setPassword("");
        navigate("/home", { replace: false });
      } else {
        setError("User data not found!");
      }
    } catch (err) {
      setError(err.message);
      setPassword("");
    }
  };

  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(135deg, #ffecd2, #fcb69f); /* same as Home/Contact */
          }
          .login-card {
            background: white;
            border-radius: 20px;
            padding: 2.5rem;
            max-width: 400px;
            width: 100%;
            color: #212529;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }
          .login-card:hover {
            transform: translateY(-10px) rotateY(5deg);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          }
          .btn-login {
            background-color: #ffc107;
            color: #212529;
            font-weight: bold;
            border-radius: 25px;
            transition: transform 0.3s ease, opacity 0.3s ease;
          }
          .btn-login:hover {
            background-color: #ffc107;
            color: #212529 !important;            
            transform: scale(1.05);
          }
          .error-message {
            color: #ff6b6b;
          }
          .back-btn {
            background-color: #ffc107;
            color: #212529;
            font-weight: bold;
            border-radius: 20px;
            transition: 0.3s;
          }
          .back-btn:hover {
            transform: scale(1.05);
          }
          .form-control:focus {
            box-shadow: 0 0 5px #ffc107;
            border-color: #ffc107;
          }
        `}
      </style>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold text-warning" href="/">
            CanteenIQ
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="container mt-4 d-flex justify-content-start">
        <button
          className="btn back-btn animate__animated animate__pulse animate__infinite"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      {/* Login Card */}
      <div className="container d-flex justify-content-center align-items-center py-5">
        <div className="login-card shadow-lg animate__animated animate__flipInY">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#ffc107" }}>
            Login
          </h2>

          {error && (
            <div className="text-center mb-3 animate__animated animate__shakeX error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="emailInput">Email</label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="passwordInput">Password</label>
            </div>

            <button type="submit" className="btn w-100 btn-login animate__animated animate__pulse animate__infinite">
              Login
            </button>
          </form>

          <p className="text-center mt-3">
            Don’t have an account?{" "}
            <span
              className="fw-bold"
              style={{ cursor: "pointer", color: "#ffc107" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
