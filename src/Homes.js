import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "./style.css"; // if you have extra css

function Homes() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top animate__animated animate__fadeInDown">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            <i className="bi bi-cup-straw"></i> CanteenIQ
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
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
             
              
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contact
                </a>
                </li>
                 <li className="nav-item">

                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero d-flex align-items-center justify-content-center text-center text-white"
        style={{
          position: "relative",
          height: "100vh",
          background:
            "url('/images/canteen-bg.jpg') no-repeat center center/cover",
        }}
      >
        <div
          style={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.6)",
          }}
        ></div>
        <div
          className="hero-content animate__animated animate__zoomIn"
          style={{ zIndex: 2 }}
        >
          <h1 className="display-3 fw-bold">
            Welcome to <span className="text-warning">CanteenIQ</span>
          </h1>
          <p className="lead mb-4 animate__animated animate__fadeInUp animate__delay-1s">
            Smart food ordering & tracking system 🚀
          </p>
          
        </div>
      </section>

      {/* Features */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold mb-4" data-aos="fade-up">
            Why Choose CanteenIQ?
          </h2>
          <div className="row g-4">
            <div className="col-md-4" data-aos="flip-left">
              <div className="card feature-card p-4 h-100">
                <i className="bi bi-lightning-charge display-4 text-warning mb-3"></i>
                <h5 className="fw-bold">Quick Orders</h5>
                <p>Place your orders in seconds and save time during rush hours.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="flip-up">
              <div className="card feature-card p-4 h-100">
                <i className="bi bi-geo-alt display-4 text-danger mb-3"></i>
                <h5 className="fw-bold">Live Tracking</h5>
                <p>Track your order status in real-time with live updates.</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="flip-right">
              <div className="card feature-card p-4 h-100">
                <i className="bi bi-cup-straw display-4 text-success mb-3"></i>
                <h5 className="fw-bold">Delicious Menu</h5>
                <p>Explore a wide variety of tasty and healthy food items.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Counters */}
      <section
        className="py-5 text-center text-white"
        style={{ background: "linear-gradient(90deg,#ff8800,#ffbb33)" }}
      >
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3" data-aos="zoom-in">
              <div className="counter">500+</div>
              <p>Orders Daily</p>
            </div>
            <div className="col-md-3" data-aos="zoom-in" data-aos-delay="200">
              <div className="counter">50+</div>
              <p>Food Items</p>
            </div>
            <div className="col-md-3" data-aos="zoom-in" data-aos-delay="400">
              <div className="counter">200+</div>
              <p>Happy Customers</p>
            </div>
            <div className="col-md-3" data-aos="zoom-in" data-aos-delay="600">
              <div className="counter">10+</div>
              <p>Staff Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
              <img
                src="/images/canteen-bg.jpg"
                alt="About CanteenIQ"
                className="img-fluid about-img rounded shadow-lg"
              />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <h2 className="fw-bold">About CanteenIQ</h2>
              <p className="lead">
                We’re transforming traditional canteens into smart, digital-first
                experiences. From quick orders to live tracking, we make sure your
                food is served faster and fresher.
              </p>
              <a href="/menu" className="btn btn-warning mt-3">
                Explore Menu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-4" data-aos="fade-up">
            What Our Customers Say
          </h2>
          <div className="row g-4">
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="testimonial animate__animated animate__fadeInLeft">
                "CanteenIQ saves me so much time between classes. Love it!"
                <br />
                <small>- Student A</small>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="testimonial animate__animated animate__fadeInUp">
                "Food is fresh and service is fast. Highly recommended."
                <br />
                <small>- Student B</small>
              </div>
            </div>
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="500">
              <div className="testimonial animate__animated animate__fadeInRight">
                "No more long queues! The app makes ordering easy."
                <br />
                <small>- Student C</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-5 text-center text-white"
        style={{ background: "#212529" }}
      >
        <div className="container">
          <h2 className="fw-bold animate__animated animate__pulse animate__infinite">
            Ready to Order?
          </h2>
          <p className="mb-4">
            Join hundreds of happy customers enjoying smarter canteen services.
          </p>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center">
        <div className="container">
          <p className="mb-0">&copy; 2025 CanteenIQ</p>
          <div className="mt-2 footer-icons">
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

export default Homes;