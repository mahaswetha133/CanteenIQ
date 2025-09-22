import React from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Contact() {
  const navigate = useNavigate(); // <-- Initialize navigate

  return (
    <>
      <style>
        {`
          body {
            background: linear-gradient(135deg, #ffecd2, #fcb69f);
          }
          .contact-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            transition: transform 0.3s ease-in-out;
          }
          .contact-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          }
          .icon-circle {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffc107;
            color: #212529;
            font-size: 1.5rem;
            margin: auto;
          }
          footer {
            background: #212529;
            color: white;
            padding: 20px 0;
          }
          footer a {
            color: #f8f9fa;
            margin: 0 8px;
            font-size: 1.4rem;
            transition: transform 0.3s, color 0.3s;
          }
          footer a:hover {
            color: #ffc107;
            transform: scale(1.2) rotate(5deg);
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
              <li className="nav-item">
                <a className="nav-link" href="/menu">Menu</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/orders">Orders</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active text-warning" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Back Button */}
      <div className="container mt-4">
        <button
          className="btn btn-secondary mb-4"
          onClick={() => navigate(-1)} // <-- Go back to previous page
        >
          ← Back
        </button>
      </div>
      
      {/* Contact Section */}
      <div className="container py-5">
        <h2 className="text-center fw-bold mb-4">
          📞 Get in Touch with <span className="text-warning">CanteenIQ</span>
        </h2>
        <p className="text-center text-muted mb-5">
          We’d love to hear from you! Reach out with your questions, suggestions, or feedback.
        </p>

        <div className="row g-4">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div className="contact-card text-center shadow-lg">
              <div className="icon-circle mb-3"><i className="bi bi-telephone-fill"></i></div>
              <h5 className="fw-bold">Call Us</h5>
              <p className="text-muted">+91 98765 43210</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="contact-card text-center shadow-lg">
              <div className="icon-circle mb-3"><i className="bi bi-envelope-fill"></i></div>
              <h5 className="fw-bold">Email Us</h5>
              <p className="text-muted">support@canteeniq.com</p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="contact-card text-center shadow-lg">
              <div className="icon-circle mb-3"><i className="bi bi-geo-alt-fill"></i></div>
              <h5 className="fw-bold">Visit Us</h5>
              <p className="text-muted">CanteenIQ HQ, Chennai, India</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <div className="shadow-lg contact-card">
              <h4 className="fw-bold text-center mb-4">Send Us a Message</h4>
              <form>
                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-person-fill"></i> Name
                  </label>
                  <input type="text" className="form-control" placeholder="Your Name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-envelope-fill"></i> Email
                  </label>
                  <input type="email" className="form-control" placeholder="Your Email" />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <i className="bi bi-chat-dots-fill"></i> Message
                  </label>
                  <textarea className="form-control" rows="4" placeholder="Write your message here..."></textarea>
                </div>
                <button type="submit" className="btn btn-warning w-100 fw-bold">
                  🚀 Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center">
        <div className="container">
          <p className="mb-0">&copy; 2025 CanteenIQ</p>
          <div className="mt-2">
            <a href="https://facebook.com" className="text-light mx-2"><i className="bi bi-facebook"></i></a>
            <a href="https://twitter.com" className="text-light mx-2"><i className="bi bi-twitter"></i></a>
            <a href="https://instagram.com" className="text-light mx-2"><i className="bi bi-instagram"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Contact;
