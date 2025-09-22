import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), { name, email, role });

      alert("✅ Registered Successfully!");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(135deg, #ffecd2, #fcb69f);
          }
          .register-card {
            background: white;
            border-radius: 20px;
            padding: 2.5rem;
            max-width: 420px;
            width: 100%;
            color: #212529;
            transition: transform 0.4s ease, box-shadow 0.4s ease;
          }
          .register-card:hover {
            transform: translateY(-10px) rotateY(5deg);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          }
          .btn-register {
            background-color: #ffc107 !important;
            color: #212529 !important;
            font-weight: bold;
            border-radius: 25px;
            transition: transform 0.3s ease;
          }
          .btn-register:hover {
            transform: scale(1.05);
            background-color: #ffc107 !important;
            color: #212529 !important;
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
          /* For all input/select fields */
.form-control, .form-select {
  background: #fff3cd !important; /* light yellow */
  color: #212529 !important;
  border: 0;
  border-bottom: 2px solid #ffc107;
  border-radius: 0;
  transition: box-shadow 0.3s ease;
}

.form-control:focus, .form-select:focus {
  box-shadow: 0 0 5px #ffc107;
  border-color: #ffc107;
  background: #fff3cd;
  color: #212529;
}

label {
  color: #ffc107;
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

      {/* Register Card */}
      <div className="container d-flex justify-content-center align-items-center py-5">
        <div className="register-card shadow-lg animate__animated animate__flipInY">
          <h3 className="text-center mb-4 fw-bold text-warning">
            Register
          </h3>

          {error && (
            <div className="text-center mb-3 animate__animated animate__shakeX error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            {/* Name */}
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="nameInput">Full Name</label>
            </div>

            {/* Email */}
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

            {/* Password */}
            <div className="form-floating mb-3">
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

            {/* Role */}
            <div className="form-floating mb-4">
              <select
                className="form-select"
                id="roleSelect"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <label htmlFor="roleSelect">Register As</label>
            </div>

            {/* Register Button */}
            <button type="submit" className="btn w-100 btn-register animate__animated animate__pulse animate__infinite"
>
              Register
            </button>
          </form>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <span
              className="fw-bold"
              style={{ cursor: "pointer", color: "#ffc107" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
