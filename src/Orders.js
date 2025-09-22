import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css"; // ✅ Import Animate.css

function Orders() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [orders, setOrders] = useState([]);

  const statusOptions = [
    "Pending",
    "In Progress",
    "Ready",
    "Delivered",
    "Completed",
    "Cancelled",
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const user = auth.currentUser;
    if (!user) return;

    // Get user role
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      setRole(userDoc.data().role || "user");
    }

    // Build query based on role
    let ordersQuery;
    if (userDoc.data().role === "admin") {
      ordersQuery = collection(db, "orders"); // admin sees all
    } else {
      ordersQuery = query(
        collection(db, "orders"),
        where("userId", "==", user.uid) // user sees only own orders
      );
    }

    const snap = await getDocs(ordersQuery);
    setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const updateStatus = async (id, newStatus) => {
    if (!newStatus) return;
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, {
      status: newStatus,
      history: arrayUnion({
        status: newStatus,
        time: new Date().toISOString(),
      }),
    });
    fetchOrders(); // refresh
  };

  const filteredOrders = orders; // already filtered by query
  const activeOrders = filteredOrders.filter((o) => o.status !== "Completed");
  const previousOrders = filteredOrders.filter((o) => o.status === "Completed");

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #ffecd2, #fcb69f)", // ✅ Gradient background
      }}
    >
      <div className="container">
        <button
          className="btn btn-secondary mb-4 animate__animated animate__fadeInLeft"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h2 className="fw-bold text-dark mb-4 animate__animated animate__bounceIn">
          {role === "admin" ? "📦 Manage Orders" : "📦 My Orders"}
        </h2>

        
        {/* Active Orders */}
        <div className="card shadow mb-4 animate__animated animate__flipInX">
          <div className="card-header fw-bold bg-warning text-dark">
            🚀 Active Orders
          </div>
          <div className="card-body">
            {activeOrders.length > 0 ? (
              <table className="table table-hover animate__animated animate__fadeInUp">
                <thead className="table-warning">
                  <tr>
                    {role === "admin" && <th>User</th>}
                    <th>Items</th>
                    <th>Status</th>
                    <th>History</th>
                    {role === "admin" && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {activeOrders.map((order) => (
                    <tr key={order.id} className="animate__animated animate__zoomIn">
                      {role === "admin" && <td>{order.userId}</td>}
                      <td>
                        {order.items?.map((i, idx) => (
                          <div key={idx}>
                            {i.name} - ₹{i.price}
                          </div>
                        ))}
                      </td>
                      <td className="fw-bold">{order.status}</td>
                      <td>
                        <ul className="small mb-0">
                          {order.history?.map((h, idx) => (
                            <li key={idx}>
                              {h.status} – {new Date(h.time).toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      </td>
                      {role === "admin" && (
                        <td>
                          <select
                            className="form-select form-select-sm"
                            value={order.status}
                            onChange={(e) => updateStatus(order.id, e.target.value)}
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No active orders</p>
            )}
          </div>
        </div>

     {/* Previous Orders */}
<div className="card shadow animate__animated animate__fadeInUp">
  <div className="card-header fw-bold bg-warning text-dark">
    📜 Previous Orders
  </div>
  <div className="card-body">
    {previousOrders.length > 0 ? (
      <table className="table table-hover animate__animated animate__fadeIn">
        <thead className="table-warning">
          <tr>
            {role === "admin" && <th>User</th>}
            <th>Items</th>
            <th>History</th>
          </tr>
        </thead>
        <tbody>
          {previousOrders.map((order) => (
            <tr
              key={order.id}
              className="animate__animated animate__fadeInUp"
              style={{ backgroundColor: "#ffffff" }} // ✅ White row background
            >
              {role === "admin" && <td>{order.userId}</td>}
              <td>
                {order.items?.map((i, idx) => (
                  <div key={idx}>
                    {i.name} - ₹{i.price}
                  </div>
                ))}
              </td>
              <td>
                <ul className="small mb-0">
                  {order.history?.map((h, idx) => (
                    <li key={idx}>
                      {h.status} – {new Date(h.time).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No previous orders</p>
    )}
  </div>
</div>

      </div>
    </div>
  );
}

export default Orders;