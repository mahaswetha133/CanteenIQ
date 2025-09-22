import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

function Menu() {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [burstId, setBurstId] = useState(null); // for burst animation

  useEffect(() => {
    const fetchMenu = async () => {
      const querySnapshot = await getDocs(collection(db, "menuItems"));
      setMenuItems(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
    setBurstId(item.id); // trigger burst animation
    setTimeout(() => setBurstId(null), 800); // remove animation class after duration
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const placeOrder = async () => {
    if (!auth.currentUser) {
      alert("⚠️ Please login to place order");
      return;
    }
    if (cart.length === 0) {
      alert("⚠️ Your cart is empty!");
      return;
    }

    await addDoc(collection(db, "orders"), {
      userId: auth.currentUser.uid,
      items: cart,
      status: "Pending",
      createdAt: serverTimestamp(),
      history: [{ status: "Pending", time: new Date().toISOString() }],
    });

    alert("✅ Order placed successfully!");
    setCart([]);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #ffecd2, #fcb69f)", // ✅ Gradient background
      }}
    >
      <div className="container">
        {/* Back Button */}
        <button
          className="btn btn-secondary mb-4 shadow-sm animate__animated animate__fadeInLeft"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2 className="text-center fw-bold mb-5 animate__animated animate__fadeInDown">
          🍴 Our Delicious Menu
        </h2>

        {/* Menu Cards */}
        <div className="row g-4">
          {menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div
                key={item.id}
                className={`col-md-4 animate__animated ${
                  burstId === item.id ? "animate__tada" : "animate__flipInX"
                }`}
                style={{ animationDuration: "0.8s" }}
              >
                <div className="card shadow-lg h-100 border-0 rounded-4 position-relative overflow-hidden hover-shadow">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="card-img-top"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        transition: "transform 0.3s",
                      }}
                    />
                  )}
                  <div className="card-body text-center p-4">
                    <h5 className="fw-bold">{item.name}</h5>
                    <p className="text-muted mb-1">Category: {item.category}</p>
                    <p className="fw-bold text-success fs-5">₹{item.price}</p>
                    <button
                      className="btn btn-warning rounded-pill px-4 shadow-sm hover-scale"
                      onClick={() => addToCart(item)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No items available yet.</p>
          )}
        </div>

        {/* Cart Section */}
        <div className="mt-5 animate__animated animate__zoomIn">
          <h4>🛒 Cart</h4>
          {cart.length > 0 ? (
            <>
              <ul className="list-group mb-3">
                {cart.map((c, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center shadow-sm rounded"
                  >
                    {c.name} – ₹{c.price}
                    <div>
                      <span className="badge bg-warning rounded-pill me-2">{c.category}</span>
                      <button
                        className="btn btn-danger btn-sm fw-bold"
                        onClick={() => removeFromCart(idx)}
                      >
                        ✖
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                className="btn btn-success fw-bold shadow-sm hover-scale"
                onClick={placeOrder}
              >
                ✅ Place Order
              </button>
            </>
          ) : (
            <p>No items in cart</p>
          )}
        </div>
      </div>

      {/* Extra Styles */}
      <style>{`
        .hover-shadow:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          transition: all 0.3s ease-in-out;
        }
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default Menu;
