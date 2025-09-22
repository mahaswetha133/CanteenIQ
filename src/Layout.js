// src/Layout.js
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("🚪 Logged out successfully!");
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top animate__animated animate__fadeInDown">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/home">
            <i className="bi bi-cup-straw"></i> CanteenIQ
          </Link>
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
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">Menu</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-warning ms-3 rounded-pill"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page content */}
      <div style={{ marginTop: "70px" }}>
        <Outlet /> {/* child pages render here */}
      </div>

      {/* Footer */}
      <footer className="text-center bg-dark text-light py-3 mt-5">
        <div className="container">
          <p className="mb-0">&copy; 2025 CanteenIQ</p>
          <div className="mt-2">
            <a href="https://facebook.com" className="text-light mx-2">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="https://twitter.com" className="text-light mx-2">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="https://instagram.com" className="text-light mx-2">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Layout;
